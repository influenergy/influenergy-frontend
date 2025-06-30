import { api } from "./api";

interface LoginCredentials {
  email: string;
  password: string;
  userType: string;
}

interface RegisterUserData {
  fullName: string;
  email: string;
  password: string;
}

interface BrandUserData {
  fullName: string;
  companyName?: string;
  companyEmail: string;
  companyWebsite?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },
  brandRegister: async (userData: BrandUserData) => {
    const response = await api.post("/brand/register", userData);
    return response.data;
  },
  creatorRegister: async (userData: RegisterUserData) => {
    const response = await api.post("/creator/register", userData);
    return response.data;
  },
  logout: async (userType: string) => {
    const response = await api.post("/logout",{ userType });
    return response.data;
  },
  resendVerificationEmail: async (email: string) => {
    const response = await api.post("/creator/resend_verify-email", {
      email,
    });
    return response.data;
  },
  verifyEmail: async (token: string) => {
    const response = await api.get(`/creator/verify-email/${token}`);
    return response.data;
  },
  setPassword: async (token: string, password: string) => {
    const response = await api.post(`/set-password/${token}`, {
      password,
    });
    return response.data;
  },
  forgotPassword: async (email: string, userType: string) => {
    const response = await api.post(`/forgot-password`, { email, userType });
    return response.data;
  },
};
