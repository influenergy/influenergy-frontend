import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

export default function FeaturedModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

    const Levels = [
        {
            title: "Level 1 - Rising Creator",
            color: "text-gray-300",
            img: "/bronze-award.svg",
            text: "Badge unlocked at $50 per video",
        },
        {
            title: "Level 2 - Active Creator",
            color: "text-gold-300",
            img: "/gold-award.svg",
            text: "Badge unlocked at $50 per video",
        },
        {
            title: "Level 3 - Pro Creator",
            color: "text-platinum-300",
            img: "/award.svg",
            text: "Badge unlocked at $50 per video",
        },
    ]
    const Benefits = [
        {
            title: "Get Featured",
            color: "text-gray-300",
            img: "/verified.svg",
            text: "You will be Featured on to the Explore creator page",
        },
        {
            title: "Get Verified",
            color: "text-gold-300",
            img: "/verified.svg",
            text: "You will get a Rising Creator, Active Creator, Pro Creator badges.",
        },
        {
            title: "Attract Brands",
            color: "text-platinum-300",
            img: "/verified.svg",
            text: "Attract More brands for collaboration",
        },
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 15 }}
                        className="relative w-3/4  max-h-[90%] overflow-scroll rounded-xl overflow-x-hidden"
                    >
                        <Card className="rounded-2xl shadow-xl p-6 bg-white dark:bg-gray-900">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Body */}
                            <div className="flex flex-col items-center text-center space-y-10 mt-2">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        Unlock Your Creator Badge & Get More Collaborations
                                    </h2>
                                    {/* <p className="text-gray-600 dark:text-gray-300">
                                        Become a featured or verified creator on <strong>Influenergy</strong>.
                                    </p> */}
                                </div>

                                <div className="flex gap-4 flex-wrap">
                                    {Levels.map((lvl, idx) => {
                                        return <div key={idx} className="mb-4 flex-1">
                                            <Card className="h-full dark:bg-gray-800">
                                                <div className="p-4 flex justify-between flex-col items-center gap-4">
                                                    <div className="w-16 h-16 relative"> {/* fixed box for all images */}
                                                        <Image
                                                            src={lvl.img}
                                                            alt="flex user"
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <h3 className={`text-lg font-semibold ${lvl.color}`}>{lvl.title}</h3>
                                                    <p className="text-gray-600 dark:text-gray-300">{lvl.text}</p>
                                                </div>
                                            </Card>
                                        </div>
                                    })}
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        Benefits of becoming a featured creator
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Become a featured or verified creator on <strong>Influenergy</strong>.
                                    </p>
                                </div>

                                <div className="flex gap-4 flex-wrap">
                                    {Benefits.map((lvl, idx) => {
                                        return <div key={idx} className="mb-4 flex-1">
                                            <Card className="h-full dark:bg-gray-800">
                                                <div className="p-4 flex justify-between flex-col items-center gap-4">
                                                    <div className="w-10 h-10 relative"> {/* fixed box for all images */}
                                                        <Image
                                                            src={lvl.img}
                                                            alt="flex user"
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <h3 className={`text-lg font-semibold ${lvl.color}`}>{lvl.title}</h3>
                                                    <p className="text-gray-600 dark:text-gray-300">{lvl.text}</p>
                                                </div>
                                            </Card>
                                        </div>
                                    })}
                                </div>

                                <p className="text-gray-400 md:max-w-3xl text-base dark:text-white">Set your UGC pricing according to your level today and <span className="text-black dark:text-white">unlock your badge to attract more collaborations and income opportunities!</span></p>

                                <Button
                                    onClick={onClose}
                                    className="bg-purple-600 text-white rounded-xl hover:bg-purple-700 px-8"
                                >
                                    Get Featured
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
