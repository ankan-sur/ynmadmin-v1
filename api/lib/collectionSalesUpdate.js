import { GlobalActionContext } from "gadget-server";

/**
 * Fetches all collections associated with user keys and attempts to fetch products for each collection.
 * 
 * @param {GlobalActionContext} context The context provided by Gadget.
 */
export async function run({ api, logger }) {
  try {
    // Fetch all users and gather their keys into a unique set
    const users = await api.user.findMany({
      select: { keys: true } // Assuming 'keys' is an array field on the User model
    });
    const uniqueKeys = new Set(users.flatMap(user => user.keys).filter(Boolean));

    // Fetch collections that match the unique keys
    const matchedCollections = [];
    for (const key of uniqueKeys) {
      const collections = await api.shopifyCollection.findMany({
        filter: { handle: { equals: key } },
        select: { id: true, handle: true } // Adjust selection as needed
      });
      matchedCollections.push(...collections);
    }

    // Attempt to fetch products for each collection
    for (const collection of matchedCollections) {
      try {
        // Assuming there's a method to fetch products directly linked to a collection
        const products = await api.shopifyProduct.findMany({
          filter: { collectionId: { equals: collection.id } },
          select: { id: true, title: true } // Example product fields
        });
        // Log the products for debugging
        logger.info(`Products for Collection ${collection.handle}: ${JSON.stringify(products)}`);
      } catch (productError) {
        logger.error(`Failed to fetch products for Collection ${collection.handle}: ${productError.message}`);
      }
    }

    // Optionally, return matched collections or a success message
    return {
      success: true,
      message: "Fetched all collections associated with user keys, attempted to fetch products.",
      matchedCollections: matchedCollections.map(({ id, handle }) => ({ id, handle }))
    };
  } catch (error) {
    logger.error(`Failed to fetch collections: ${error.message}`);
    return { success: false, error: error.message };
  }
};
