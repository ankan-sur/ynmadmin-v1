import { transitionState, applyParams, preventCrossShopDataAccess, save, shopifySync, ActionOptions, ShopifySyncState, RunShopifySyncActionContext } from "gadget-server";

/**
 * @param { RunShopifySyncActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  transitionState(record, {to: ShopifySyncState.Running});
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
  await shopifySync(params, record);
};

/**
 * @param { RunShopifySyncActionContext } context
 */
export async function onSuccess({ api, record, params, logger, connections }) {
  if (record.shopId) {
    const shop = await api.shopifyShop.findOne(record.shopId);
    await api.shopifySync.run({
      shopifySync: {
        domain: shop.domain,
        shop: {
          _link: record.shopId,
        },
        // optional parameter
        models: [

          "shopifyShop",

          "shopifyOrder",

          "shopifyOrderLineItem",

          "shopifyRefund",

          "shopifyRefundLineItem",

          "shopifyOrderAdjustment",

          "shopifyCollection",

          "shopifyCollect",

          "shopifyProduct",

          "shopifyDomain",

          "shopifyFulfillmentLineItem",

          "shopifyFulfillment",

          "shopifyPayout",

          "shopifyBulkOperation"

        ],
      },
    });
  }
}

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
  triggers: { api: true },
};
