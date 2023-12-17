import axios from "axios";
import { HttpKit } from "./HttpKit";

export const uploadSettings = {
  headers: {
    Accept: "*/*",
    "content-type": "multipart/form-data",
  },
};

const ApiKit = {
  util: {
    getServerInfo: () => axios.get("/api/server-info"),
  },
  auth: {
    login: (payload) => {
      console.log(payload);
      const url = "api/v1/token/";
      return HttpKit.post(url, payload);
    },
    verify: (token) => {
      const url = "/token/verify/";
      return post(url, { token });
    },
  },

  me: {
    info: () => HttpKit.get("api/v1/me/"),
    logOut: () => HttpKit.post("api/v1/me/logout/", {}),
    getEmployeePermissionGroup: () =>
      HttpKit.get("api/v1/users/organizations/permission-group/employee/"),

    setPassword: (data) =>
      HttpKit.post("api/v1/auth/users/set_password/", data),
    resetPasswordRequest: (data) =>
      HttpKit.post("api/v1/me/password-reset/request/", data),
    getOrganizationSettings: () =>
      HttpKit.get("api/v1/users/organizations/settings/"),
    updateProfile: (data) => HttpKit.patch("api/v1/me/", data),
    updateProfileWithPhoto: (data) =>
      HttpKit.patch("api/v1/me/", data, {
        ...uploadSettings,
      }),
    getNotifications: () =>
      HttpKit.get("api/v1/notification/user/notifications/"),
    getNotificationCount: () => HttpKit.get("api/v1/notification/count/"),
    updateNotificationStatus: ({ alias, data }) =>
      HttpKit.patch(`api/v1/notification/user/notifications/${alias}/`, data),
    updateAllNotificationsAsRead: () =>
      HttpKit.post("api/v1/notification/mark-all-as-read/"),
    registerNewUser: ({ payload: data }) =>
      HttpKit.post("api/v1/users/ecom/register/", prepareFormData({ data })),
  },
  notification: {
    registerPushToken: ({ data }) =>
      HttpKit.post("api/v1/notification/register-push-token/", data),
  },

  search: {
    getPersonOrganizationSuppliers: (params = {}) =>
      HttpKit.get("api/v1/search/users/person-organization/suppliers/", {
        params,
      }),
    getPersonOrganizationContractors: (params = {}) =>
      HttpKit.get("api/v1/search/users/person-organization/contractors/", {
        params,
      }),
    getPersonOrganizationEmployees: (params = {}) =>
      HttpKit.get("api/v1/search/users/person-organization/employees/", {
        params,
      }),
    getPharmacyProductManufacturers: (params = {}) =>
      HttpKit.get("/api/v1/search/pharmacy/product/manufacturer/", { params }),
    getPharmacyProducts: (params = {}) =>
      HttpKit.get("/api/v1/search/pharmacy/product/", { params }),

    users: (phrase) => {
      const url = "/search/users";
      const params = {
        params: { phrase },
      };
      return authed.then((client) => client.get(url, params));
    },

    slugable: (phrase) => {
      const url = "/search/slugable";
      const params = {
        params: { phrase },
      };
      return authed.then((client) => client.get(url, params));
    },
  },

  procurement: {
    purchase: {
      getPredictionItems: (params = {}) =>
        HttpKit.get("api/v1/procurement/purchase/prediction-items/", {
          params,
        }),
      getPredictions: (params = {}) =>
        HttpKit.get("api/v1/procurement/purchase/predictions/", { params }),
      postCreditPayment: ({ alias, data }) =>
        HttpKit.post(
          `api/v1/procurement/procures/payments/?procure=${alias}/`,
          data
        ),
    },
    procures: {
      postProcures: (data) =>
        HttpKit.post("api/v1/procurement/procures/", data),
      getProcures: (params = {}) =>
        HttpKit.get("api/v1/procurement/procures/", { params }),
      getProcureDetails: ({ alias, params = {} }) =>
        HttpKit.get(`api/v1/procurement/procures/${alias}/`, { params }),
      postRequisitionOrderPurchase: (data) =>
        HttpKit.post(
          "api/v1/procurement/procures/requisition-order-purchase/",
          data
        ),
      postProcureIssue: (data) =>
        HttpKit.post("api/v1/procurement/procures/issues/", data),
      patchProcure: ({ alias, data }) =>
        HttpKit.patch(`api/v1/procurement/procures/${alias}/`, data),
      getProcureHistory: ({ alias, params = {} }) =>
        HttpKit.get(`api/v1/procurement/procures/change-log/${alias}/`, {
          params,
        }),
      getProcureReturns: (alias) =>
        HttpKit.get(
          `api/v1/procurement/procures/returns-settlements/log/${alias}/`
        ),
      getProcureProductContractorPurchases: ({ params = {} }) =>
        HttpKit.get(
          `api/v1/procurement/procures/product-contractor-purchases/`,
          { params }
        ),
      getProcureStatusLog: (alias) =>
        HttpKit.get(`api/v1/procurement/procures/status-log/${alias}/`),
      getProcureLog: (alias) =>
        HttpKit.get(`api/v1/procurement/procures/log/${alias}/`),
      getProcurePayment: (alias) =>
        HttpKit.get(`api/v1/procurement/procures/payments/${alias}/log/`),
    },
    procureGroups: {
      postProcureGroup: (data) =>
        HttpKit.post("api/v1/procurement/procures/groups/", data),
      getProcureGroups: (params = {}) =>
        HttpKit.get("api/v1/procurement/procures/groups/", { params }),
      getProcureGroupDetails: ({ alias, params = {} }) =>
        HttpKit.get(`api/v1/procurement/procures/groups/${alias}/`, { params }),
      deleteProcureGroup: ({ alias }) =>
        HttpKit.delete(`api/v1/procurement/procures/groups/${alias}/`),
      postProcureGroupStatus: (data) =>
        HttpKit.post("api/v1/procurement/procures/groups/status/", data),
      postRequisitionOrderPurchaseGroup: (data) =>
        HttpKit.post(
          "api/v1/procurement/procures/groups/complete-purchase/",
          data
        ),
      postEditProcureGroup: (data) =>
        HttpKit.post("api/v1/procurement/procures/groups/edit/", data),
    },
    predictionItemSupplier: {
      info: {
        getPredictionItemSupplierInfo: (params = {}) =>
          HttpKit.get("api/v1/procurement/prediction-item-supplier/info/", {
            params,
          }),
      },
    },
    predictionItem: {
      postMark: (data) =>
        HttpKit.post("api/v1/procurement/prediction-item/mark/", data),
      postProcureStatus: (data) =>
        HttpKit.post("api/v1/procurement/procure-status/", data),
      getPredictionItemCurrentWorstRate: ({ alias }) =>
        HttpKit.get(`api/v1/procurement/purchase/prediction-items/${alias}/`),
      updatePredictionItemWorstRate: ({ alias, data }) =>
        HttpKit.patch(
          `api/v1/procurement/purchase/prediction-items/${alias}/`,
          data
        ),
    },
    procureInfo: {
      getProcureInfoReport: ({ params = {} }) =>
        HttpKit.get(`api/v1/procurement/procures/info/report/`, { params }),
      getProcureInfoSummary: ({ params = {} }) =>
        HttpKit.get(`api/v1/procurement/procures/info/summary/`, { params }),
      getPurchaseInfoReport: ({ params = {} }) =>
        HttpKit.get(`api/v1/procurement/report/procurement-purchase-info/`, {
          params,
        }),
    },
    getShopNames: (params = {}) =>
      HttpKit.get("api/v1/procurement/shop-names/", { params }),
    getNextInvoiceNumber: (params = {}) =>
      HttpKit.get("api/v1/procurement/procures/next-invoice-number/", {
        params,
      }),
    returns: {
      getReturns: (params = {}) =>
        HttpKit.get("api/v1/procurement/procures/returns/", { params }),
      postReturn: (data) =>
        HttpKit.post("api/v1/procurement/procures/returns/", data),
      patchReturn: ({ alias, data = {} }) =>
        HttpKit.patch(`api/v1/procurement/procures/returns/${alias}/`, data),
      deleteReturn: ({ alias }) =>
        HttpKit.delete(`api/v1/procurement/procures/returns/${alias}/`),
      deleteSettlement: ({ alias }) =>
        HttpKit.delete(
          `api/v1/procurement/procures/returns/settlement/${alias}/`
        ),
      postReturnSettlement: (data) =>
        HttpKit.post(`api/v1/procurement/procures/returns/settlements/`, data),
    },
  },
};

export default ApiKit;
