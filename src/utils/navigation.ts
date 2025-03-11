import { isClient } from "./isClient";

/**
 * Safe navigation utility to redirect users
 * This handles both client and server environments safely
 */
export const safeNavigate = (path: string) => {
  if (isClient) {
    window.location.href = path;
  }
  // On server, do nothing - navigation will happen on client
};

/**
 * Get the current URL path safely (works in both client and server environments)
 * @returns The current path or empty string if on server
 */
export const getCurrentPath = () => {
  if (isClient) {
    return window.location.pathname;
  }
  return ''; // Return empty string on server
};
