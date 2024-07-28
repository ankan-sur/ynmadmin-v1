import { GlobalActionContext } from "gadget-server";

/**
 * @param {GlobalActionContext} context
 */
export async function run({ api, logger }) {
  try {
    // Fetch all products
    let products = await api.shopifyProduct.findMany({
      select: { id: true }, // Only select the id for performance
    });

    // Loop through all products and update totalSales to 0.00
    for (const product of products) {
      await api.shopifyProduct.update(product.id, { totalSales: 0 });
      logger.info(`Updated product ${product.id} totalSales to 0.00`);
    }

    // Check if there are more products to fetch and update
    while (products.hasNextPage) {
      products = await products.nextPage();
      for (const product of products) {
        await api.shopifyProduct.update(product.id, { totalSales: 0 });
        logger.info(`Updated product ${product.id} totalSales to 0.00`);
      }
    }

    logger.info("Successfully updated all products' totalSales to 0.00");
  } catch (error) {
    logger.error(`Error updating products: ${error.message}`);
    throw error; // Rethrow the error for Gadget to handle
  }
};

export const options = { triggers: { api: true } }