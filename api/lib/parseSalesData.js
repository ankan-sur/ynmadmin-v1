import { GlobalActionContext } from "gadget-server";

/**
 * @param {GlobalActionContext} context
 */
export async function run({ api, logger }) {
  try {
    // Initialize a counter for order line items processed
    let orderLineItemsCount = 0;

    // Fetch all ShopifyOrderLineItems
    let lineItemsPage = await api.shopifyOrderLineItem.findMany({
      select: { id: true, price: true, productId: true }
    });

    // Initialize a map to keep track of total sales per product
    const productSalesMap = new Map();

    // Process each page of line items
    do {
      // Process each line item in the current page
      for (const item of lineItemsPage) {
        const productId = item.productId;
        const itemPrice = parseFloat(item.price);

        if (productId && !isNaN(itemPrice)) {
          // Update total sales in the map
          const currentTotal = productSalesMap.get(productId) || 0;
          productSalesMap.set(productId, currentTotal + itemPrice);

          // Increment the counter
          orderLineItemsCount++;
        }
      }

      // Fetch the next page if available
      if (lineItemsPage.hasNextPage) {
        lineItemsPage = await lineItemsPage.nextPage();
      } else {
        break; // Exit the loop if there are no more pages
      }
    } while (true);

    // Update each product's totalSales
    for (const [productId, totalSales] of productSalesMap) {
      await api.shopifyProduct.update(productId, { totalSales: totalSales });
    }

    // Log the total number of order line items processed
    logger.info(`Processed ${orderLineItemsCount} order line items and updated product total sales.`);

  } catch (error) {
    logger.error(`Error processing order line items: ${error.message}`);
    throw error; // Rethrow the error for Gadget to handle
  }
};
