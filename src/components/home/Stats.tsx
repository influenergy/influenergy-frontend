"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { userApi } from "@/services/userServices";

interface StatsProps {
    typeStats: {
        type: string,
        percentage: number
    }[],
    usStats: {
        usPercentage: number,
        nonUsPercentage: number
    }
}


export default function Stats() {
    const [stats, setStats] = React.useState<StatsProps | null>(null);
    useEffect(() => {
        userApi.getStats().then(res => {
            setStats(res.data);
        });
    }, []);


    return (
        <motion.div
            className="w-full py-6 sm:py-8 md:py-10 px-2 sm:px-4 bg-[#f7f6ff] relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            id="influencers"
        >
            <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-[#352547]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
            >
                Brand success, powered by Influenergy
            </motion.h1>
            <motion.h3
                className="text-gray-600 text-sm md:text-base leading-relaxed text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
            >
                See how brands use Influenergy to boost ROAS, cut CPAs, and scale faster with creator video ads.
            </motion.h3>


            <div className="w-full py-12 px-4 text-center grid grid-cols-2 sm:grid-cols-4 gap-6  max-w-6xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-start">
                        <h3 className="text-3xl md:text-4xl lg:text-6xl font-bold text-primary">{stats?.usStats.usPercentage}%</h3>
                        <p className="text-sm text-gray-700 font-semibold text-start">US Audience</p>
                    </div>
                </div>
                {
                    stats?.typeStats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="flex flex-col items-start">
                                <h3 className="text-3xl md:text-4xl lg:text-6xl font-bold text-primary">{stat.percentage}%</h3>
                                <p className="text-sm text-gray-700 font-semibold">{stat.type === "Creator" ? "Influencers" : "UGC Creators"}</p>
                            </div>
                        </div>
                    ))
                }
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-start">
                        <h3 className="text-3xl md:text-4xl lg:text-6xl font-bold text-primary">5M+</h3>
                        <p className="text-sm text-gray-700 font-semibold">Total Followers of our Creators</p>
                    </div>
                </div>

            </div>
            {/* </div> */}
        </motion.div>
    );
}
