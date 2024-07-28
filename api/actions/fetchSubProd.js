import { FetchUsersGlobalActionContext } from "gadget-server";

/**
 * @param { FetchUsersGlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  try {
    // Fetch all users with selected fields
    const prods = await api.submitProducts.findMany({
      select: {
        id: true,
        uploaded: true,
        title: true,
        measurements: true,
        description: {markdown: true},
        productTags: true,
        collectionTag: true,
        store: true,
        submittedBy: {firstName: true, email: true},
      }
    });

    return {
      success: true,
      data: prods
    };
  } catch (error) {
    logger.error(`Failed to fetch users: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const options = { triggers: { api: true } }