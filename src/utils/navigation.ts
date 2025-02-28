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
