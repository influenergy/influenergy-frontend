/**
 * Utility function to check if code is running on the client-side
 * Use this to safely access browser-only APIs like window, document, localStorage, etc.
 */
export const isClient = typeof window !== 'undefined';
