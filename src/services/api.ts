import { BrandQuestionnaireData } from "@/types/Questionnaire";
import axios from "axios";

export interface QuestionnaireData {
  gender: string;
  "Your City": string;
  "Date of Birth": string;
  "Phone Number": number;
  categories: string;
  "What type of content do you enjoy creating the most?": string;
  "What tools and platforms do you use for content creation?": string;
  "What is your target audience?": string;
  "What are your content creation goals?": string;
}

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

export const creatorApi = {
  submitQuestionnaire: async (formData: QuestionnaireData) => {
    const response = await api.post("/creator/questionnaire", formData);
    return response.data;
  },
};

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },
  register: async (userData: {
    full_name: string;
    email: string;
    password: string;
    userType: string;
  }) => {
    const response = await api.post("/signup", userData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
};

export const brandApi = {
  submitQuestionnaire: async (data: BrandQuestionnaireData) => {
    try {
      const response = await axios.post("/api/brand/questionnaire", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
