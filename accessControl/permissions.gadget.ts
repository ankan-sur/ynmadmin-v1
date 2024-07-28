import type { GadgetPermissions } from "gadget-server";

/**
 * This metadata describes the access control configuration available in your application.
 * Grants that are not defined here are set to false by default.
 *
 * View and edit your roles and permissions in the Gadget editor at https://ynmadmin.gadget.app/edit/settings/permissions
 */
export const permissions: GadgetPermissions = {
  type: "gadget/permissions/v1",
  roles: {
    unauthenticated: {
      storageKey: "unauthenticated",
      models: {
        shopifyCollection: {
          read: true,
        },
        shopifyProduct: {
          read: true,
        },
        user: {
          actions: {
            resetPassword: true,
            sendResetPassword: true,
            sendVerifyEmail: true,
            signIn: true,
            signUp: true,
            verifyEmail: true,
          },
        },
      },
      actions: {
        fetchEmails: true,
        smartCollecter: true,
      },
    },
    API: {
      storageKey: "Role-oYYPxHuEK88X",
      default: {
        read: true,
        action: true,
      },
      models: {
        session: {
          read: true,
        },
        shopifyApp: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyAppInstallation: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyBalanceTransaction: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyBulkOperation: {
          read: true,
          actions: {
            cancel: true,
            complete: true,
            create: true,
            expire: true,
            fail: true,
            update: true,
          },
        },
        shopifyCheckout: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyCheckoutLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyCollect: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyCollection: {
          read: true,
          actions: {
            create: true,
            delete: true,
            smartCollector: true,
            update: true,
          },
        },
        shopifyCompany: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDiscount: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDiscountCode: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDispute: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDisputeEvidence: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDomain: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillment: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentOrder: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentOrderLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentService: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyGdprRequest: {
          read: true,
          actions: {
            create: true,
            update: true,
          },
        },
        shopifyMarket: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyMarketRegion: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyMarketWebPresence: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyOrder: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyOrderAdjustment: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyOrderLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyPayout: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyPriceRule: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyProduct: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyRefund: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyRefundDuty: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyRefundLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyScriptTag: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyShippingLine: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyShop: {
          read: true,
          actions: {
            install: true,
            reinstall: true,
            uninstall: true,
            update: true,
          },
        },
        shopifySmartCollect: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifySync: {
          read: true,
          actions: {
            abort: true,
            complete: true,
            error: true,
            run: true,
          },
        },
        shopifyTenderTransaction: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        submitProducts: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        user: {
          read: true,
          actions: {
            changePassword: true,
            delete: true,
            resetPassword: true,
            sendResetPassword: true,
            sendVerifyEmail: true,
            signIn: true,
            signOut: true,
            signUp: true,
            update: true,
            verifyEmail: true,
          },
        },
      },
      actions: {
        collectionQ: true,
        fetchEmails: true,
        fetchSubProd: true,
        fetchUsers: true,
        productQ: true,
        scheduledShopifySync: true,
        setTotalZero: true,
        smartCollect: true,
        smartCollecter: true,
        userQ: true,
      },
    },
    staff: {
      storageKey: "Role-JMt6oFcF57qy",
      default: {
        read: true,
        action: true,
      },
      models: {
        session: {
          read: true,
        },
        shopifyApp: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyAppInstallation: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyBalanceTransaction: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyBulkOperation: {
          read: true,
          actions: {
            cancel: true,
            complete: true,
            create: true,
            expire: true,
            fail: true,
            update: true,
          },
        },
        shopifyCheckout: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyCheckoutLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyCollect: {
          read: true,
          actions: {
            create: true,
            update: true,
          },
        },
        shopifyCollection: {
          read: true,
          actions: {
            create: true,
            smartCollector: true,
            update: true,
          },
        },
        shopifyCompany: {
          read: true,
          actions: {
            create: true,
            update: true,
          },
        },
        shopifyDiscount: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDiscountCode: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDispute: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDisputeEvidence: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillment: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentOrder: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentOrderLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentService: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyGdprRequest: {
          read: true,
          actions: {
            create: true,
            update: true,
          },
        },
        shopifyMarket: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyMarketRegion: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyMarketWebPresence: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyOrder: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyOrderAdjustment: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyOrderLineItem: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyPayout: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyPriceRule: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyProduct: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyRefund: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyRefundDuty: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyRefundLineItem: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyScriptTag: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyShippingLine: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyShop: {
          read: true,
          actions: {
            install: true,
            update: true,
          },
        },
        shopifySmartCollect: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifySync: {
          read: true,
          actions: {
            abort: true,
            complete: true,
            error: true,
            run: true,
          },
        },
        shopifyTenderTransaction: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        submitProducts: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        user: {
          read: true,
          actions: {
            changePassword: true,
            delete: true,
            resetPassword: true,
            sendResetPassword: true,
            sendVerifyEmail: true,
            signIn: true,
            signOut: true,
            signUp: true,
            update: true,
            verifyEmail: true,
          },
        },
      },
      actions: {
        collectionQ: true,
        fetchEmails: true,
        fetchSubProd: true,
        fetchUsers: true,
        productQ: true,
        scheduledShopifySync: true,
        setTotalZero: true,
        smartCollect: true,
        smartCollecter: true,
        userQ: true,
      },
    },
    "signed-in": {
      storageKey: "Role-hRrMkQ2aX-s8",
      default: {
        read: true,
        action: true,
      },
      models: {
        shopifyApp: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyAppInstallation: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyBalanceTransaction: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyBulkOperation: {
          read: true,
          actions: {
            cancel: true,
            complete: true,
            create: true,
            expire: true,
            fail: true,
            update: true,
          },
        },
        shopifyCheckout: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyCheckoutLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyCollect: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyCollection: {
          read: true,
          actions: {
            smartCollector: true,
            update: true,
          },
        },
        shopifyCompany: {
          read: true,
          actions: {
            create: true,
            update: true,
          },
        },
        shopifyDiscount: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDiscountCode: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDispute: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyDisputeEvidence: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillment: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentOrder: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentOrderLineItem: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentService: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyGdprRequest: {
          read: true,
          actions: {
            create: true,
            update: true,
          },
        },
        shopifyMarket: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyMarketRegion: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyMarketWebPresence: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyOrder: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyOrderAdjustment: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyOrderLineItem: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyPayout: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyPriceRule: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyProduct: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyRefund: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyRefundDuty: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyRefundLineItem: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifyScriptTag: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyShippingLine: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyShop: {
          read: true,
          actions: {
            update: true,
          },
        },
        shopifySmartCollect: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifySync: {
          read: true,
          actions: {
            complete: true,
            run: true,
          },
        },
        shopifyTenderTransaction: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        submitProducts: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        user: {
          read: true,
          actions: {
            changePassword: true,
            resetPassword: true,
            sendResetPassword: true,
            sendVerifyEmail: true,
            signIn: true,
            signOut: true,
            signUp: true,
            update: true,
            verifyEmail: true,
          },
        },
      },
      actions: {
        collectionQ: true,
        fetchEmails: true,
        fetchSubProd: true,
        fetchUsers: true,
        productQ: true,
        scheduledShopifySync: true,
        setTotalZero: true,
        smartCollect: true,
        smartCollecter: true,
        userQ: true,
      },
    },
  },
};
