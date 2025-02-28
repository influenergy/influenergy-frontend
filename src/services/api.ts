import axios from "axios";
import { safeNavigate } from "@/utils/navigation";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/v1/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log('errors',error)
    if (error.response) {
      // Handle unauthorized access
      if (error.response.status === 401) {
        // Use safeNavigate for navigation that works in both client and server environments
        safeNavigate('/login');
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
