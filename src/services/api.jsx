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
