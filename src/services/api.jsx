import axios from "axios";
import { showLoading, hideLoading } from "./loadingService";
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

export const GetItemInHome = async () => {
  try {
    const { data } = await client.get("api/showInHome");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GetProduct = async (id) => {
  try {
    const { data } = await client.get(`api/product/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GetServices = async (page) => {
  try {
    const { data } = await client.get(`api/service/${page}`);
    return data;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const GetVPNPlan = async () => {
  try {
    const { data } = await client.get(`api/vpnPlan`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendNumber = async (phoneNumber) => {
  try {
    const { data } = await client.post(`api/user`, {
      phoneNumber: phoneNumber,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOPT = async () => {
  try {
    const { data } = await client.get(`api/otp`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postOTP = async (OTP) => {
  try {
    const { data } = await client.post(`api/otp`, {
      OTP: OTP,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const login = async () => {
  try {
    const { data } = await client.get(`api/login`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async () => {
  try {
    const result = await client.get(`api/me`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

// Admin API

export const getUsers = async () => {
  try {
    const result = await client.get(`api/admin/user`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await client.delete(`api/admin/user`, {
      params: {
        id: id,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, admin) => {
  try {
    const result = await client.put(
      `api/admin/user`,
      {
        admin: admin,
      },
      {
        params: {
          id: id,
        },
      },
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBrands = async () => {
  try {
    const result = await client.get(`api/admin/brand`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBrand = async (id) => {
  try {
    const result = await client.delete(`api/admin/brand`, {
      params: {
        id: id,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const addBrand = async (brandName, brandCategory) => {
  try {
    const result = await client.post(`api/admin/brand`, {
      brandName: brandName,
      brandCategory: brandCategory,
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBrand = async (id) => {
  try {
    const result = await client.get(`api/admin/brand`, {
      params: {
        id: id,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const editBrand = async (id, brandName, brandCategory) => {
  try {
    const result = await client.put(
      `api/admin/brand`,
      {
        brandName: brandName,
        brandCategory: brandCategory,
      },
      {
        params: {
          id: id,
        },
      },
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVpnClients = async () => {
  try {
    const result = await client.get(`api/admin/vpnClient`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteVpnClient = async (id) => {
  try {
    const result = await client.delete(`api/admin/vpnClient`, {
      params: {
        id: id,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const addVpnClients = async (
  clientName,
  clientProtocol,
  clientDownloadUrl,
) => {
  try {
    const result = await client.post(`api/admin/vpnClient`, {
      clientName: clientName,
      clientProtocol: clientProtocol,
      clientDownloadUrl: clientDownloadUrl,
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVpnClient = async (id) => {
  try {
    const result = await client.get(`api/admin/vpnClient`, {
      params: {
        id: id,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const editVpnClients = async (
  id,
  clientName,
  clientProtocol,
  clientDownloadUrl,
) => {
  try {
    const result = await client.put(
      `api/admin/vpnClient`,
      {
        clientName: clientName,
        clientProtocol: clientProtocol,
        clientDownloadUrl: clientDownloadUrl,
      },
      {
        params: {
          id: id,
        },
      },
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getServicesA = async () => {
  try {
    const result = await client.get(`api/admin/services`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteServicesA = async (id) => {
  try {
    const result = await client.delete(`api/admin/services`, {
      params: {
        id: id,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const addServicesA = async (
  name,
  description,
  priceIn,
  priceOut,
  warranty,
) => {
  try {
    const result = await client.post(`api/admin/services`, {
      name: name,
      description: description,
      priceIn: priceIn,
      priceOut: priceOut,
      warranty: warranty,
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceA = async (id) => {
  try {
    const result = await client.get(`api/admin/services`, {
      params: {
        id: id,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const editServicesA = async (
  name,
  description,
  priceIn,
  priceOut,
  warranty,
  id
) => {
  try {
    const result = await client.put(
      `api/admin/services`,
      {
        name: name,
        description: description,
        priceIn: priceIn,
        priceOut: priceOut,
        warranty: warranty,
      },
      {
        params: {
          id: id,
        },
      },
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
