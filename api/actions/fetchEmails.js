import { FetchUsersGlobalActionContext } from "gadget-server";

/**
 * @param { FetchUsersGlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  try {
    // Fetch all users with selected fields
    const users = await api.user.findMany({
      select: {
        email: true
      }
    });

    return {
      success: true,
      users: users
    };
  } catch (error) {
    logger.error(`Failed to fetch users: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const options = { triggers: { api: true } }