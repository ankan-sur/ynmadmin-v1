import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyDisputeEvidence" model, go to https://ynmadmin.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-DisputeEvidence",
  fields: {},
  shopify: {
    fields: [
      "customerEmailAddress",
      "customerFirstName",
      "customerLastName",
      "dispute",
      "productDescription",
      "shop",
      "submittedByMerchantOn",
      "uncategorizedText",
    ],
  },
};
