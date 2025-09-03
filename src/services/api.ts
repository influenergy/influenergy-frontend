import axios from "axios";
import { safeNavigate } from "@/utils/navigation";
import { store } from "@/store";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/v1/api";


export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const state = store.getState(); // direct store access
  const userType = state.auth.userType; // persisted from Redux

  if (userType) {
    config.headers["x-user-type"] = userType;
  }
  return config;
});

// Add interceptor to set x-user-type dynamically
api.interceptors.request.use((config) => {
  const userType = localStorage.getItem("userType"); // or from your auth state
  if (userType) {
    config.headers["x-user-type"] = userType;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log('errors',error)
    if (error.response) {
      // Handle unauthorized access
      if (error.response.status === 401) {
        const userType = localStorage.getItem("userType"); // or from your auth state
        console.log("40111")

        store.dispatch({ type: "auth/logout" });

        try {
          // Call logout without triggering interceptor again
          await api.post("/logout", { userType });
          localStorage.removeItem("userType");
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.warn("Auto logout API failed:", e.message);
          } else {
            console.warn("Auto logout API failed:", e);
          }
        }

        if (window.location.pathname !== "/login") {
          safeNavigate("/login");
        }
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
