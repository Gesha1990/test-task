import * as axios from "axios/index";

const instance = axios.create({
  baseURL: "https://5fca3e863c1c220016441fcc.mockapi.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const productsAPI = {
  getAllUsers() {
    return instance.get("users").then((response) => response.data);
  },
  getUserData(userId) {
    return instance
      .get(`users/${userId}/posts`)
      .then((response) => response.data);
  },
};
