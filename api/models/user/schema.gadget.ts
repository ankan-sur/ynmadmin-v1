import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://ynmadmin.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-HF4g4A4S7pZ7",
  fields: {
    account: {
      type: "enum",
      default: "client",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["client", "staff", "artist"],
      storageKey:
        "ModelField-gsGlHv1Eu_Lc::FieldStorageEpoch-AQFugHXPLz8w",
    },
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey:
        "ModelField-UWJhcXcu_lgA::FieldStorageEpoch-qDX49KcHh8ZB",
    },
    emailVerificationToken: {
      type: "string",
      storageKey:
        "ModelField-ol6JnOhVxrDd::FieldStorageEpoch-Gkn23zBMcc2D",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey:
        "ModelField-owZev9tkHZwl::FieldStorageEpoch-9gS3SosHdBP0",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey:
        "ModelField-265yhiAivDsO::FieldStorageEpoch-Iwx0Ced8z3cm",
    },
    firstName: {
      type: "string",
      storageKey:
        "ModelField-Fx_K4KvjV5-9::FieldStorageEpoch-zIq7b-Gf8IMU",
    },
    googleImageUrl: {
      type: "url",
      storageKey:
        "ModelField-cC9lb1XouZDK::FieldStorageEpoch-8KXqae4Ti63g",
    },
    googleProfileId: {
      type: "string",
      storageKey:
        "ModelField-QPepLpQcaNl7::FieldStorageEpoch-K2B_-08bPaFt",
    },
    keys: {
      type: "json",
      default: {},
      storageKey: "ModelField-tpF1sI3yOw83::Urml4eucn6Bm",
    },
    lastName: {
      type: "string",
      storageKey:
        "ModelField-87PNIWXPWBSn::FieldStorageEpoch-4UBaCiPwnxPj",
    },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey:
        "ModelField-8NRTQfNAWn5u::FieldStorageEpoch--xj3I3TtNa01",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey:
        "ModelField-rwOsQKzO4fGO::FieldStorageEpoch-aqbyvGfY6nkV",
    },
    resetPasswordToken: {
      type: "string",
      storageKey:
        "ModelField-5Ib7lNPXnQjd::FieldStorageEpoch-9NXLkvYJra46",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey:
        "ModelField-68wX_zb6GfH8::FieldStorageEpoch-nC2mWGUDcCed",
    },
    roles: {
      type: "roleList",
      default: ["signed-in"],
      storageKey:
        "ModelField-4w877yR5pNLJ::FieldStorageEpoch-uY_6NewD6DH6",
    },
    submitProducts: {
      type: "hasMany",
      children: {
        model: "submitProducts",
        belongsToField: "submittedBy",
      },
      storageKey: "bTknSwTzbD7D::XJRCCEZm70gl",
    },
    team: {
      type: "enum",
      default: ["YNM"],
      acceptMultipleSelections: true,
      acceptUnlistedOptions: false,
      options: ["YNM", "YNE"],
      storageKey:
        "ModelField-TTXH9GWiqhgo::FieldStorageEpoch-fnZ7w2KdRaT8",
    },
  },
};
