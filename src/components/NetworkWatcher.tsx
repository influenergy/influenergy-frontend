"use client";

import { useNetworkStatus } from "./NoNetwork";


export default function NetworkWatcher() {
  useNetworkStatus(); // automatically handles toast notifications
  return null; // nothing to render visually
}
