"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation"; // Next 13+ App Router
import { Loader2 } from "lucide-react"; // your spinner

export const PageLoader = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Trigger a brief loading state on URL changes in App Router
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timeout);
    }, [pathname, searchParams]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <Loader2 className="animate-spin text-white w-12 h-12" />
        </div>
    );
};
