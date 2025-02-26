import { BrandQuestionnaireData, QuestionnaireData } from "@/types/Questionnaire";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/v1/api";

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log('errors',error)
    if (error.response) {
      // Handle unauthorized access
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      
      // Handle rate limiting
      if (error.response.status === 429) {
        // You might want to implement retry logic or show a user-friendly message
        console.error("Too many requests. Please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export const creatorApi = {
  submitQuestionnaire: async (formData: QuestionnaireData) => {
    const response = await api.post("/creator/questionnaire", formData);
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
}