import { Test2GlobalActionContext } from "gadget-server";

/**
 * @param { Test2GlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  // Check if the tag parameter is provided
  if (!params.tag) {
    throw new Error("The tag parameter is required.");
  }

  const products = await api.shopifyProduct.findMany({
    filter: { tags: { matches: params.tag } },
    select: {
      title: true,
      tags: true,
      sold:true,
      smartCollections: {
        edges: {
          node:{
            title:true,
          }
        }
      }
      
    }
  });

  return products;
};

// Update the params object to include the new 'tag' parameter
export const params = {
  tag: {
    type: 'string',
    description: 'The tag to filter products by',
    required: true
  }
};

export const options = { triggers: { api: true } }