import axios from "axios";
import { showLoading, hideLoading } from "./loadingService";

axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    showLoading();
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (config) => {
    hideLoading();
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  },
);

// Public APIs

export const GetItemInHome = async () => {
  try {
    const { data } = await client.get("api/showInHome");
    return data;
  } catch (error) {
    console.error("GetItemInHome error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const GetProduct = async (id) => {
  try {
    const { data } = await client.get(`api/product/${id}`);
    return data;
  } catch (error) {
    console.error("GetProduct error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const GetServices = async (page) => {
  try {
    const { data } = await client.get(`api/service/${page}`);
    return data;
  } catch (error) {
    console.error("GetServices error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const GetProducts = async (page, search, productType, sort) => {
  try {
    const { data } = await client.get(`api/products/${page}`, {
      params: {
        search: search,
        productType: productType,
        sort: sort,
      },
    });
    return data;
  } catch (error) {
    console.error("GetProducts error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const GetVPNPlan = async () => {
  try {
    const { data } = await client.get(`api/vpnPlan`);
    return data;
  } catch (error) {
    console.error("GetVPNPlan error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

// Auth APIs

export const sendNumber = async (phoneNumber) => {
  try {
    const { data } = await client.post(`api/user`, {
      phoneNumber: phoneNumber,
    });
    return data;
  } catch (error) {
    console.error("sendNumber error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getOPT = async () => {
  try {
    const { data } = await client.get(`api/otp`);
    return data;
  } catch (error) {
    console.error("getOPT error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const postOTP = async (OTP) => {
  try {
    const { data } = await client.post(`api/otp`, {
      OTP: OTP,
    });
    return data;
  } catch (error) {
    console.error("postOTP error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const login = async () => {
  try {
    const { data } = await client.get(`api/login`);
    return data;
  } catch (error) {
    console.error("login error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getMe = async () => {
  try {
    const result = await client.get(`api/me`);
    return result.data;
  } catch (error) {
    console.error("getMe error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const logout = async () => {
  try {
    const { data } = await client.post(`api/logout`);
    return data;
  } catch (error) {
    console.error("logout error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

// User Order & Repair APIs

export const createOrder = async (orderData) => {
  try {
    const { data } = await client.post(`api/order`, orderData);
    return data;
  } catch (error) {
    console.error("createOrder error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getUserOrders = async () => {
  try {
    const { data } = await client.get(`api/orders`);
    return data;
  } catch (error) {
    console.error("getUserOrders error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getUserOrderDetails = async (id) => {
  try {
    const { data } = await client.get(`api/order`, {
      params: { id },
    });
    return data;
  } catch (error) {
    console.error("getUserOrderDetails error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const createRepairOrder = async (repairData) => {
  try {
    const { data } = await client.post(`api/repairOrder`, repairData);
    return data;
  } catch (error) {
    console.error("createRepairOrder error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getUserRepairOrders = async () => {
  try {
    const { data } = await client.get(`api/repairOrders`);
    return data;
  } catch (error) {
    console.error("getUserRepairOrders error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

// Admin APIs

export const getUsers = async () => {
  try {
    const result = await client.get(`api/admin/user`);
    return result.data;
  } catch (error) {
    console.error("getUsers error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await client.delete(`api/admin/user`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("deleteUser error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const updateUser = async (id, admin) => {
  try {
    const result = await client.put(
      `api/admin/user`,
      { admin },
      { params: { id } },
    );
    return result.data;
  } catch (error) {
    console.error("updateUser error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getBrands = async () => {
  try {
    const result = await client.get(`api/admin/brand`);
    return result.data;
  } catch (error) {
    console.error("getBrands error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const deleteBrand = async (id) => {
  try {
    const result = await client.delete(`api/admin/brand`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("deleteBrand error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const addBrand = async (brandName, brandCategory) => {
  try {
    const result = await client.post(`api/admin/brand`, {
      brandName,
      brandCategory,
    });
    return result.data;
  } catch (error) {
    console.error("addBrand error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getBrand = async (id) => {
  try {
    const result = await client.get(`api/admin/brand`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("getBrand error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const editBrand = async (id, brandName, brandCategory) => {
  try {
    const result = await client.put(
      `api/admin/brand`,
      { brandName, brandCategory },
      { params: { id } },
    );
    return result.data;
  } catch (error) {
    console.error("editBrand error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getVpnClients = async () => {
  try {
    const result = await client.get(`api/admin/vpnClient`);
    return result.data;
  } catch (error) {
    console.error("getVpnClients error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const deleteVpnClient = async (id) => {
  try {
    const result = await client.delete(`api/admin/vpnClient`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("deleteVpnClient error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const addVpnClients = async (clientName, clientProtocol, clientDownloadUrl) => {
  try {
    const result = await client.post(`api/admin/vpnClient`, {
      clientName,
      clientProtocol,
      clientDownloadUrl,
    });
    return result.data;
  } catch (error) {
    console.error("addVpnClients error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getVpnClient = async (id) => {
  try {
    const result = await client.get(`api/admin/vpnClient`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("getVpnClient error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const editVpnClients = async (id, clientName, clientProtocol, clientDownloadUrl) => {
  try {
    const result = await client.put(
      `api/admin/vpnClient`,
      { clientName, clientProtocol, clientDownloadUrl },
      { params: { id } },
    );
    return result.data;
  } catch (error) {
    console.error("editVpnClients error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getServicesA = async () => {
  try {
    const result = await client.get(`api/admin/services`);
    return result.data;
  } catch (error) {
    console.error("getServicesA error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const deleteServicesA = async (id) => {
  try {
    const result = await client.delete(`api/admin/services`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("deleteServicesA error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const addServicesA = async (name, description, priceIn, priceOut, warranty) => {
  try {
    const result = await client.post(`api/admin/services`, {
      name,
      description,
      priceIn,
      priceOut,
      warranty,
    });
    return result.data;
  } catch (error) {
    console.error("addServicesA error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getServiceA = async (id) => {
  try {
    const result = await client.get(`api/admin/services`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("getServiceA error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const editServicesA = async (name, description, priceIn, priceOut, warranty, id) => {
  try {
    const result = await client.put(
      `api/admin/services`,
      { name, description, priceIn, priceOut, warranty },
      { params: { id } },
    );
    return result.data;
  } catch (error) {
    console.error("editServicesA error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getVpnPlans = async () => {
  try {
    const result = await client.get(`api/admin/vpn`);
    return result.data;
  } catch (error) {
    console.error("getVpnPlans error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const deleteVpnPlan = async (id) => {
  try {
    const result = await client.delete(`api/admin/vpn`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("deleteVpnPlan error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const addVpnPlan = async (name, price, discount, duration, traffic, userCount, clientId) => {
  try {
    const result = await client.post(`api/admin/vpn`, {
      name,
      price,
      discount,
      duration,
      traffic,
      userCount,
      clientId,
    });
    return result.data;
  } catch (error) {
    console.error("addVpnPlan error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getVpnPlan = async (id) => {
  try {
    const result = await client.get(`api/admin/vpn`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("getVpnPlan error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const editVpnPlan = async (name, price, discount, duration, traffic, userCount, clientId, id) => {
  try {
    const result = await client.put(
      `api/admin/vpn`,
      { name, price, discount, duration, traffic, userCount, clientId },
      { params: { id } },
    );
    return result.data;
  } catch (error) {
    console.error("editVpnPlan error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

// Admin Product APIs

export const getAdminProducts = async (productType) => {
  try {
    const params = productType ? { productType } : {};
    const result = await client.get(`api/admin/product`, { params });
    return result.data;
  } catch (error) {
    console.error("getAdminProducts error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getAdminProduct = async (id) => {
  try {
    const result = await client.get(`api/admin/product`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("getAdminProduct error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const addAdminProduct = async (formData) => {
  try {
    const result = await client.post(`api/admin/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (error) {
    console.error("addAdminProduct error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const editAdminProduct = async (id, productData) => {
  try {
    const result = await client.put(`api/admin/product`, productData, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("editAdminProduct error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const deleteAdminProduct = async (id) => {
  try {
    const result = await client.delete(`api/admin/product`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("deleteAdminProduct error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

// Admin Stats, Orders, Repair APIs

export const getAdminStats = async () => {
  try {
    const result = await client.get(`api/admin/stats`);
    return result.data;
  } catch (error) {
    console.error("getAdminStats error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getAdminOrders = async () => {
  try {
    const result = await client.get(`api/admin/orders`);
    return result.data;
  } catch (error) {
    console.error("getAdminOrders error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getAdminOrderDetails = async (id) => {
  try {
    const result = await client.get(`api/admin/orders`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("getAdminOrderDetails error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const updateAdminOrderStatus = async (id, status) => {
  try {
    const result = await client.put(
      `api/admin/orders`,
      { status },
      { params: { id } },
    );
    return result.data;
  } catch (error) {
    console.error("updateAdminOrderStatus error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const deleteAdminOrder = async (id) => {
  try {
    const result = await client.delete(`api/admin/orders`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("deleteAdminOrder error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const getAdminRepairOrders = async () => {
  try {
    const result = await client.get(`api/admin/repairOrders`);
    return result.data;
  } catch (error) {
    console.error("getAdminRepairOrders error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};

export const deleteAdminRepairOrder = async (id) => {
  try {
    const result = await client.delete(`api/admin/repairOrders`, {
      params: { id },
    });
    return result.data;
  } catch (error) {
    console.error("deleteAdminRepairOrder error:", error);
    return { success: false, message: error?.response?.data?.message || error.message };
  }
};
