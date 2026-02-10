//src/api/authApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,   // 🔥 THIS IS THE KEY
});

export const authApi = {
  login: (data) => API.post("/login", data),
  register: (data) => API.post("/register", data),
};
