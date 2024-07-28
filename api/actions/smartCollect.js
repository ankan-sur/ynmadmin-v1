import { ActionContext } from "gadget-server";

/**
 * Finds the collection associated with the provided key and creates a smartconnect item for each product with the same key.
 *
 * @param {ActionContext} context - The context provides methods and properties that are passed to the action.
 * @param {string} key - The key associated with the collection and products.
 */
export async function run(context, handle) {
  const { api, logger } = context;

  try {
    // Find the collection associated with the key
    const collection = await api.shopifyCollection.findMany({
      filter: { handle: { equals: handle } },
      select: { rules: true, id: true },
    });

    if (!collection) {
      logger.info(`No collection found for handle: ${handle}`);
      return;
    }

    const key = collection[0].rules[0].condition;

    // Find products associated with the same key
    const products = await api.shopifyProduct.findMany({
      filter: { tags: { matches: key } },
      first: 250,
    });

    for (const product of products){

      await api.shopifySmartCollect.create({
        collection: { _link: collection[0].id } ,
        product: { _link: product.id } ,
      });
    }

  } catch (error) {
    logger.error(`Error in smartCollect function for handle: ${handle}`, error);
    throw error;
  }
  logger.info(`smartCollect process completed for handle: ${handle}`);
}

export const options = { triggers: { api: true } }