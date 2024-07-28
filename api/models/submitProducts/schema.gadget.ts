import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "submitProducts" model, go to https://ynmadmin.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "SHD4QowCEC6o",
  fields: {
    collectionTag: {
      type: "string",
      storageKey: "gCcsDbJJ_O87::d8EJeJthgTy7",
    },
    description: {
      type: "richText",
      storageKey: "napb3WPoYJH2::UWjIekwDnCDy",
    },
    distribution: {
      type: "enum",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["Collab", "Original", "Bundle", "Commercial"],
      storageKey: "VZzVKK1Lgc3a",
    },
    measurements: {
      type: "string",
      default: "",
      storageKey: "fQzbr4676SeK",
    },
    participating: { type: "string", storageKey: "JnZcVggmu258" },
    productTags: {
      type: "string",
      storageKey: "sYHXIBOl6MBf::GfocsgdHTgYg",
    },
    store: {
      type: "enum",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["YNM", "YNE"],
      storageKey: "YgGuyunJi-lx::GE4DUAURtNVl",
    },
    submittedBy: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "W6h_xAMyBJrT::wii6ctyp_aDh",
    },
    title: {
      type: "string",
      storageKey: "Ejg9uuZaVtn-::djEBf8fHTMUy",
    },
    uploaded: {
      type: "boolean",
      default: false,
      storageKey: "DTd52j237EN9::xkCBCS6sd79_",
    },
  },
};
