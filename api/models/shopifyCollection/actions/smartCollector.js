import {
  applyParams,
  preventCrossShopDataAccess,
  save,
  ActionOptions,
  SmartCollectorShopifyCollectionActionContext,
} from "gadget-server";

/**
 * @param { SmartCollectorShopifyCollectionActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  let handle = record.handle;
  if (record.collectionType === "smart") {
    try {
      // Iterate over each rule in the collection's rules array
      for (const rule of record.rules) {
        let tag = rule.condition;

        // Find products associated with the same key (assuming 'tag' is the key for filtering)
        const products = await api.shopifyProduct.findMany({
          filter: { tags: { matches: tag } },
          select: { id: true },
          first: 250,
        });

        for (const product of products) {
          // Check if a smartCollect already exists with the same productId and collectionId
          const existingCollects = await api.shopifySmartCollect.findMany({
            filter: {
              productId: { equals: product.id },
              collectionId: { equals: record.id }
            },
            select: { id: true },
          });

          if (existingCollects.length === 0) {
            // If no existing collect, create a new smartCollect
            await api.shopifySmartCollect.create({
              shopifySmartCollect: {
                collection: { _link: record.id },
                product: { _link: product.id },
              },
            });
          } else {
            // If smartCollect exists, log and skip
            logger.info(`Product with id: ${product.id} already in collection with id: ${record.id}; skipping.`);
          }
        }
      }
      logger.info(`smartCollect process completed for handle: ${handle}`);
    } catch (error) {
      logger.error(`Error in smartCollect function for handle: ${handle}`, error);
      throw error;
    }
  } else {
    logger.info(`smartCollect process not completed for handle: ${handle}, collection is not a smart collection`);
  }
}

/**
 * @param { SmartCollectorShopifyCollectionActionContext } context
 */
export async function onSuccess({ record, api, logger }) {
  try {
    // Update the 'collected' field to now
    
    const currentTime = new Date().toISOString();

    await api.shopifyCollection.update(record.id, {
      shopifyCollection: {
        collected: currentTime,
      },
    });
    logger.info(`Successfully set 'collected' for collection with id: ${record.id}`);
  } catch (error) {
    logger.error(`Error setting 'collected' for collection with id: ${record.id}`, error);
    throw error;
  }
}

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  transactional: false,
  triggers: { api: true },
};
