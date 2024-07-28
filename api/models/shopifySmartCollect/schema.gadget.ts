import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifySmartCollect" model, go to https://ynmadmin.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-n7RKMtquHcO9",
  fields: {
    collection: {
      type: "belongsTo",
      parent: { model: "shopifyCollection" },
      storageKey:
        "ModelField-XbeQWPCJmSg2::FieldStorageEpoch-S6K9maq6wNfM",
    },
    product: {
      type: "belongsTo",
      parent: { model: "shopifyProduct" },
      storageKey:
        "ModelField-j4tfPGLtNejx::FieldStorageEpoch-HeW5xmB9bE6_",
    },
    shop: {
      type: "belongsTo",
      parent: { model: "shopifyShop" },
      storageKey:
        "ModelField-gq8IIBwSnufX::FieldStorageEpoch-G0h9PoDcKR8G",
    },
  },
};
