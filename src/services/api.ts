import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string;
  }) => {
    const response = await api.post("/register", userData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
};
