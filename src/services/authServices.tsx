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

interface UpdateProfileData {
  fullName: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },
  register: async (userData: RegisterUserData) => {
    const response = await api.post("/creator/register", userData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/auth/logout");
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
  updateProfile: async (id: string, data: UpdateProfileData) => {
    const response = await api.put(`/creator/update`, data);
    return response.data;
  },
};
