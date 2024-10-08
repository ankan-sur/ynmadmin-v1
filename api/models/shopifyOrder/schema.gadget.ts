import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyOrder" model, go to https://ynmadmin.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-Order",
  fields: {},
  shopify: {
    fields: [
      "additionalFees",
      "adjustments",
      "balanceTransactions",
      "billingAddress",
      "browserIp",
      "buyerAcceptsMarketing",
      "cancelReason",
      "cancellation",
      "cancelledAt",
      "cartToken",
      "checkoutToken",
      "checkouts",
      "clientDetails",
      "closedAt",
      "currency",
      "currentSubtotalPrice",
      "currentSubtotalPriceSet",
      "currentTotalAdditionalFeesSet",
      "currentTotalDiscounts",
      "currentTotalDiscountsSet",
      "currentTotalDutiesSet",
      "currentTotalPrice",
      "currentTotalPriceSet",
      "currentTotalTax",
      "currentTotalTaxSet",
      "customerLocale",
      "discountApplications",
      "discountCodes",
      "disputes",
      "email",
      "estimatedTaxes",
      "financialStatus",
      "fulfillmentOrders",
      "fulfillmentStatus",
      "fulfillments",
      "landingSite",
      "lineItems",
      "name",
      "note",
      "noteAttributes",
      "number",
      "orderNumber",
      "orderStatusUrl",
      "originalTotalAdditionalFeesSet",
      "originalTotalDutiesSet",
      "paymentGatewayNames",
      "phone",
      "poNumber",
      "presentmentCurrency",
      "processedAt",
      "purchasingCompany",
      "purchasingEntity",
      "referringSite",
      "refunds",
      "shippingAddress",
      "shippingLines",
      "shop",
      "shopifyCreatedAt",
      "shopifyProtect",
      "shopifyUpdatedAt",
      "sourceIdentifier",
      "sourceName",
      "sourceUrl",
      "subtotalPrice",
      "subtotalPriceSet",
      "tags",
      "taxExempt",
      "taxLines",
      "taxesIncluded",
      "tenderTransactions",
      "test",
      "token",
      "totalDiscounts",
      "totalDiscountsSet",
      "totalLineItemsPrice",
      "totalLineItemsPriceSet",
      "totalOutstanding",
      "totalPrice",
      "totalPriceSet",
      "totalShippingPriceSet",
      "totalTax",
      "totalTaxSet",
      "totalTipReceived",
      "totalWeight",
    ],
  },
};
