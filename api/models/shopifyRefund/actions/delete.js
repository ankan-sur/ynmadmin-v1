import { preventCrossShopDataAccess, deleteRecord, ActionOptions, DeleteShopifyRefundActionContext } from "gadget-server";

/**
 * @param { DeleteShopifyRefundActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await preventCrossShopDataAccess(params, record);
  await deleteRecord(record);
};

/**
 * @param { DeleteShopifyRefundActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete",
  triggers: { api: false },
};
