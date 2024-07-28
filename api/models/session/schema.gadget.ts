import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "session" model, go to https://ynmadmin.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-oBSDBwuAqmDd",
  fields: {
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey:
        "ModelField-5rLxoME3Hz8o::FieldStorageEpoch-HW-x9Fidppxm",
    },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey:
        "ModelField-4iedE7v0n0b-::FieldStorageEpoch-r24xlZ7wztyo",
    },
  },
  shopify: { fields: ["shop", "shopifySID"] },
};
