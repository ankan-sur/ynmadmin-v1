import { globalShopifySync, ScheduledShopifySyncGlobalActionContext } from "gadget-server";

const HourInMs = 60 * 60 * 1000;

/**
 * @param { ScheduledShopifySyncGlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  // Filter out the sync-only models and get their API identifiers
  const syncOnlyModels = connections.shopify.enabledModels
    .filter(model => model.syncOnly)
    .map(model => model.apiIdentifier);

  // Calculate the syncSince date to be 25 hours ago
  const syncSince = new Date(Date.now() - 25 * HourInMs);

  // Run the global Shopify sync for all stores
  await globalShopifySync({
    apiKeys: connections.shopify.apiKeys,
    syncSince,
    models: syncOnlyModels
  });
};

export const options = {
  triggers: {
    api: true,
    scheduler: [
      { every: "day", at: "15:00 UTC" },
    ],
  },
}