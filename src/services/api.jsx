import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

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
