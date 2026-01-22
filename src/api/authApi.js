import axios from "./axiosConfig";

export const authApi = {
  login: (data) => axios.post("/auth/login", data),
  register: (data) => axios.post("/auth/register", data),
  me: () => axios.get("/auth/me"),
};
