import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyCheckout" model, go to https://ynmadmin.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-Checkout",
  fields: {},
  shopify: {
    fields: [
      "abandonedCheckoutUrl",
      "appliedDiscount",
      "buyerAcceptsMarketing",
      "completedAt",
      "creditCard",
      "currency",
      "customerLocale",
      "device",
      "discountCode",
      "email",
      "legalNoticeUrl",
      "lineItems",
      "name",
      "note",
      "noteAttributes",
      "order",
      "orderStatusUrl",
      "paymentDue",
      "paymentUrl",
      "payments",
      "phone",
      "presentmentCurrency",
      "privacyPolicyUrl",
      "refundPolicyUrl",
      "requiresShipping",
      "reservationTime",
      "reservationTimeLeft",
      "shippingLine",
      "shippingPolicyUrl",
      "shop",
      "shopifyCreatedAt",
      "shopifyPaymentsAccountId",
      "shopifyUpdatedAt",
      "sourceIdentifier",
      "sourceName",
      "sourceUrl",
      "subscriptionPolicyUrl",
      "subtotalPrice",
      "taxExempt",
      "taxLines",
      "taxManipulations",
      "taxesIncluded",
      "termsOfSaleUrl",
      "termsOfServiceUrl",
      "token",
      "totalLineItemsPrice",
      "totalPrice",
      "totalTax",
      "totalTipReceived",
      "userId",
      "webUrl",
    ],
  },
};
