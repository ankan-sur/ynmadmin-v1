import { FetchUsersGlobalActionContext } from "gadget-server";

/**
 * @param { FetchUsersGlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  try {
    // Fetch all users with selected fields
    const users = await api.user.findMany({
      select: {
        id: true,
        firstName: true, // Assuming 'firstName' is a field in your User model
        email: true,      // Assuming 'email' is a field in your User model
        keys: true,
        account: true,
        keys: true,
      
      }
    });

    // Log the emails of fetched users
    users.forEach(user => {
      logger.info(`User email: ${user.email}`);
    });

    // Optionally, you can return the list of users or any relevant information
    // Here we're returning both firstName and email for each user
    return {
      success: true,
      users: users.map(user => ({ id: user.id, firstName: user.firstName, email: user.email, keys: user.keys, account: user.account }))
    };
  } catch (error) {
    logger.error(`Failed to fetch users: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const options = { triggers: { api: true } }