import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyProduct" model, go to https://ynmadmin.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-Product",
  fields: {
    sales: {
      type: "computed",
      sourceFile: "api/models/shopifyProduct/sales.gelly",
      storageKey:
        "ModelField-WssUcqd-g2-Q::FieldStorageEpoch-_V2mmMuP8zTj",
    },
    shopifySmartCollects: {
      type: "hasMany",
      children: {
        model: "shopifySmartCollect",
        belongsToField: "product",
      },
      storageKey:
        "ModelField-_Kkt8xPsbNVE::FieldStorageEpoch-F_7z_v3KXs6S",
    },
    smartCollections: {
      type: "hasManyThrough",
      sibling: {
        model: "shopifyCollection",
        relatedField: "smartProducts",
      },
      join: {
        model: "shopifySmartCollect",
        belongsToSelfField: "product",
        belongsToSiblingField: "collection",
      },
      storageKey:
        "ModelField-MMDdb6pLZ3Xe::FieldStorageEpoch-2CsZ0vKVpISY",
    },
    sold: {
      type: "computed",
      sourceFile: "api/models/shopifyProduct/sold.gelly",
      storageKey: "RTng4_AQJDWF::NKt7g-SFaQuH",
    },
  },
  shopify: {
    fields: [
      "body",
      "checkoutLineItems",
      "compareAtPriceRange",
      "customCollections",
      "handle",
      "orderLineItems",
      "productCategory",
      "productType",
      "publishedAt",
      "publishedScope",
      "shop",
      "shopifyCreatedAt",
      "shopifyUpdatedAt",
      "status",
      "tags",
      "templateSuffix",
      "title",
      "vendor",
    ],
  },
};
