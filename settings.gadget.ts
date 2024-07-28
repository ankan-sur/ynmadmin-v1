import type { GadgetSettings } from "gadget-server";

export const settings: GadgetSettings = {
  type: "gadget/settings/v1",
  frameworkVersion: "v1.1.0",
  plugins: {
    connections: {
      shopify: {
        apiVersion: "2024-01",
        enabledModels: [
          "shopifyApp",
          "shopifyAppInstallation",
          "shopifyBalanceTransaction",
          "shopifyCheckout",
          "shopifyCollect",
          "shopifyCollection",
          "shopifyDomain",
          "shopifyGdprRequest",
          "shopifyMarket",
          "shopifyOrder",
          "shopifyOrderAdjustment",
          "shopifyOrderLineItem",
          "shopifyPayout",
          "shopifyPriceRule",
          "shopifyProduct",
          "shopifyRefund",
          "shopifyRefundLineItem",
          "shopifyScriptTag",
          "shopifyShippingLine",
          "shopifyTenderTransaction",
        ],
        type: "admin",
      },
    },
    authentications: {
      settings: {
        redirectOnSignIn: "/signed-in",
        signInPath: "/sign-in",
        unauthorizedUserRedirect: "signInPath",
        defaultSignedInRoles: ["signed-in"],
      },
      methods: {
        emailPassword: true,
        googleOAuth: {
          scopes: ["email", "profile"],
          offlineAccess: false,
        },
      },
    },
  },
};
