// app/dashboard/loading.tsx
import React from "react";
import Image from "next/image";
import styles from "./Loader.module.css";
export default function DashboardLoading() {
  return (
    // <div className="flex items-center justify-center h-screen">
    //   <Loader2 className="animate-spin w-12 h-12 text-primary" />
    // </div>
    <div className={styles.loaderWrapper}>
    <Image src="/images/logo-white.svg" alt="InfluEnergy Logo" width={120} height={120} />
    <div className={styles.spinner}></div>
  </div>
  );
}
