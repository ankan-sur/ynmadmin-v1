import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyCollection" model, go to https://ynmadmin.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-Collection",
  fields: {
    collected: {
      type: "dateTime",
      includeTime: true,
      storageKey:
        "ModelField-zjx57nopRUUD::FieldStorageEpoch-BHLbr00xRgKG",
    },
    customSales: {
      type: "computed",
      sourceFile: "api/models/shopifyCollection/customSales.gelly",
      storageKey: "RF1mJtWVl2HU::ZgTfWwE2Unlo",
    },
    shopifySmartCollects: {
      type: "hasMany",
      children: {
        model: "shopifySmartCollect",
        belongsToField: "collection",
      },
      storageKey:
        "ModelField-sitzHk7FZx5j::FieldStorageEpoch-4XRDEVMyml1Z",
    },
    shopname: {
      type: "computed",
      sourceFile: "api/models/shopifyCollection/shopname.gelly",
      storageKey: "ywYaEcC7bEG9::syfbq5z5wILB",
    },
    smartProducts: {
      type: "hasManyThrough",
      sibling: {
        model: "shopifyProduct",
        relatedField: "smartCollections",
      },
      join: {
        model: "shopifySmartCollect",
        belongsToSelfField: "collection",
        belongsToSiblingField: "product",
      },
      storageKey:
        "ModelField-YdkF62Cqf5K6::FieldStorageEpoch-2ODXzfhwgmbM",
    },
    smartSales: {
      type: "computed",
      sourceFile: "api/models/shopifyCollection/sales.gelly",
      storageKey:
        "ModelField-nkyTLm4eyX1D::FieldStorageEpoch-_CYgnEtKQsgw",
    },
  },
  shopify: {
    fields: [
      "body",
      "collectionType",
      "disjunctive",
      "handle",
      "image",
      "products",
      "publishedAt",
      "publishedScope",
      "rules",
      "shop",
      "shopifyUpdatedAt",
      "sortOrder",
      "templateSuffix",
      "title",
    ],
  },
};
