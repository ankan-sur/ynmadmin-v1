import { Test2GlobalActionContext } from "gadget-server";

/**
 * @param { Test2GlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  // Check if the tag parameter is provided
  if (!params.tag) {
    throw new Error("The tag parameter is required.");
  }

  const users = await api.user.findMany({
    filter: { id: { matches: params.id } },
    select: {
      id: true,
      submitProducts: {
        edges: {
          node:{
            title:true,
          }
        }
      }
      
    }
  });

  return users;
};

// Update the params object to include the new 'tag' parameter
export const params = {
  tag: {
    type: 'string',
    id: 'userid',
    required: true
  }
};

export const options = { triggers: { api: true } }