import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/services/userServices";
import { useState } from "react";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setUserBadge } from "@/store/features/authSlice";

export default function FeaturedModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [earnedBadge, setEarnedBadge] = useState<string | null>(null);

    const { toast } = useToast();
    const dispatch = useDispatch()

    const addBadgeMutation = useMutation({
        mutationFn: () => userApi.addBadge(),
        onSuccess: (data) => {
            const badge = data?.data?.badge || "level_1";
            setEarnedBadge(badge);
            setShowSuccess(true);

            dispatch(setUserBadge(badge))
            // Auto close after 2.5 seconds
            setTimeout(() => {
                setShowSuccess(false);
                setEarnedBadge(null);
                onClose();
            }, 3000);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            const description = error.response?.data?.message || "Please try again later.";
            toast({ variant: "destructive", title: "Submission failed", description });
        },
    });

    const handleGetFeatured = () => {
        addBadgeMutation.mutate();
    };


    const Levels = [
        {
            key: "level_1",
            title: "Level 1 - Rising Creator",
            img: "/bronze-award.svg",
            text: "Unlocked instantly when you join the program.",
            price: "50"
        },
        {
            key: "level_2",
            title: "Level 2 - Active Creator",
            img: "/gold-award.svg",
            text: "Unlock after completing 3 successful collaborations.",
            price: "100"
        },
        {
            key: "level_3",
            title: "Level 3 - Pro Creator",
            img: "/award.svg",
            text: "Unlock after completing 10 successful collaborations.",
            price: "150"
        },
    ];

    const Benefits = [
        {
            title: "Get Featured",
            img: "/verified.svg",
            text: "You will be Featured on the Explore Creator page.",
        },
        {
            title: "Get Verified",
            img: "/verified.svg",
            text: "You will get Rising, Active, or Pro Creator badges.",
        },
        {
            title: "Attract Brands",
            img: "/verified.svg",
            text: "Attract more brands for collaborations.",
        },
    ];

    // Find badge details from response
    const badgeDetails = Levels.find((lvl) => lvl.key === earnedBadge);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 15 }}
                        className="relative w-3/4 max-h-[90%] overflow-scroll rounded-xl overflow-x-hidden"
                    >
                        <Card className="rounded-2xl shadow-xl p-6 bg-white dark:bg-gray-900">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>

                            {/* Success Animation */}
                            <AnimatePresence>
                                {showSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                                        className="flex flex-col items-center justify-center text-center py-16 space-y-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                                            className="relative w-28 h-28"
                                        >
                                            <Image
                                                src={badgeDetails?.img || "/gold-award.svg"}
                                                alt="featured badge"
                                                fill
                                                className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]"
                                            />
                                        </motion.div>

                                        <motion.h2
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-yellow-400 bg-clip-text text-transparent"
                                        >
                                            {badgeDetails?.title || "You’re now Featured! 🌟"}
                                        </motion.h2>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="text-gray-600 dark:text-gray-300 text-lg max-w-md"
                                        >
                                            Congrats! You’ve unlocked the <strong>{badgeDetails?.title}</strong> badge.
                                            <br />
                                            Your profile will now appear on the <strong>Explore</strong> page.
                                        </motion.p>
                                    </motion.div>
                                ) : (
                                    /* Default Modal Body */
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center text-center space-y-10 mt-2"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                                Unlock Your Creator Badge & Get More Collaborations
                                            </h2>
                                        </div>

                                        <div className="flex gap-4 flex-wrap">
                                            {Levels.map((lvl, idx) => (
                                                <div key={idx} className="mb-4 flex-1">
                                                    <Card className="h-full dark:bg-gray-800">
                                                        <div className="p-4 flex flex-col items-center gap-4">
                                                            <div className="w-16 h-16 relative">
                                                                <Image
                                                                    src={lvl.img}
                                                                    alt="badge"
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                            <h3 className="text-lg font-semibold">{lvl.title}</h3>
                                                            <p className="text-gray-600 dark:text-gray-300">{lvl.text}</p>
                                                            <p className="bg-primary text-white px-3 py-2 rounded-xl">${lvl.price} per video</p>
                                                        </div>
                                                    </Card>
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                                Benefits of becoming a featured creator
                                            </h2>
                                        </div>

                                        <div className="flex gap-4 flex-wrap">
                                            {Benefits.map((lvl, idx) => (
                                                <div key={idx} className="mb-4 flex-1">
                                                    <Card className="h-full dark:bg-gray-800">
                                                        <div className="p-4 flex flex-col items-center gap-4">
                                                            <div className="w-10 h-10 relative">
                                                                <Image
                                                                    src={lvl.img}
                                                                    alt="benefit"
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                            <h3 className="text-lg font-semibold">{lvl.title}</h3>
                                                            <p className="text-gray-600 dark:text-gray-300">{lvl.text}</p>
                                                        </div>
                                                    </Card>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="text-gray-400 md:max-w-3xl text-base dark:text-white">
                                            Set your UGC pricing according to your level today and{" "}
                                            <span className="text-black dark:text-white">
                                                unlock your badge to attract more collaborations and income opportunities!
                                            </span>
                                        </p>

                                        <Button
                                            onClick={handleGetFeatured}
                                            disabled={addBadgeMutation.isPending}
                                            className="bg-purple-600 text-white rounded-xl hover:bg-purple-700 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {addBadgeMutation.isPending ? "Processing..." : "Get Featured"}
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
