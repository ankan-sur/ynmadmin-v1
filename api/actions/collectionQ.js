import { TestGlobalActionContext } from "gadget-server";

/**
 * @param { TestGlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  // Check if the key parameter is provided
  if (!params.key) {
    throw new Error("The key parameter is required.");
  }

  const collections = await api.shopifyCollection.findMany({
    filter: {
      handle: {
        equals: params.key // Use the dynamic key from params
      }
    },
    select: {
      id: true,
      rules: true,
      handle: true,
      smartSales: true,
      customSales: true,
      collectionType: true,
      smartProducts: {
        edges: {
          node: {
            title: true,
            sales: true,
            status: true
          }
        }
      },
      products: {
        edges: {
          node: {
            title: true,
            sales: true,
            status: true
          }
        }
      },
      shop: {
        id: true
      }
    }
  });

  return collections;
};

// Update the params object to include the new 'key' parameter
export const params = {
  key: {
    type: 'string',
    description: 'The key to filter collections by handle',
    required: true
  }
};

export const options = { triggers: { api: true } }