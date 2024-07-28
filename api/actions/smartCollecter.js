import { GlobalActionContext } from "gadget-server";

/**
 * Checks all smart ShopifyCollections for their rules and creates a ShopifyCollectS item for every product that matches the rules.
 * @param { GlobalActionContext } context - The context provides methods and properties that are passed to the global action.
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
        filter: { handle: { equals: key.handle } },
        select: { id: true, handle: true, collected: true } // Adjust selection as needed
      });
      matchedCollections.push(...collections);
    }

    const now = new Date();

    for (const collection of matchedCollections) {
      try {
        
        // Check if 'collected' is null or older than 24 hours
        const collectedTime = collection.collected ? new Date(collection.collected) : null;
        const timeDiff = collectedTime ? now - collectedTime : null;
        const hoursDiff = timeDiff !== null ? timeDiff / (1000 * 60 * 60) : null; // Convert milliseconds to hours

        if (collectedTime === null || hoursDiff < 24) {
          // If 'collected' is null or older than 24 hours, perform the smartCollector call
          const products = await api.shopifyCollection.smartCollector(collection.id);
        } else {
          // Skip the current collection as 'collected' is not older than 24 hours
          logger.info(`Skipping Collection ${collection.handle}: 'collected' field is not older than 24 hours.`);
        }
      } catch (error) {
        logger.error(`Failed to process Collection ${collection.handle}: ${error.message}`);
      }
    }
        
    return { success: true, message: "Processed smart collections successfully." };
  } catch (error) {
    console.error("Error collecting smart collections:", error);
    throw error; // Rethrow the error to handle it in the calling context
  };}
export const options = {
  triggers: {
    api: true,
    scheduler: [
      { every: "day", at: "21:30 UTC" },
    ],
  },
}