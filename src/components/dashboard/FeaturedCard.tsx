import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function FeaturedCard({ handleFeature }:{handleFeature: () => void}) {
    const stars = [
        { top: "10%", left: "20%", size: 14, delay: 0 },
        { top: "30%", left: "80%", size: 12, delay: 1 },
        { top: "70%", left: "10%", size: 10, delay: 2 },
        { top: "80%", left: "60%", size: 16, delay: 1.5 },
    ];

    return (
        <Card className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white rounded-xl">
            {/* Floating stars */}
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute text-white/40"
                    style={{ top: star.top, left: star.left }}
                    animate={{
                        y: [0, -4, 0],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 3,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Star size={star.size} />
                </motion.div>
            ))}

            {/* Content */}
            <div className="flex gap-4 flex-col relative">
                <h2 className="text-xl font-semibold text-white">Get Featured?</h2>
                <p className="text-white">
                    Become a featured or verified creator On Influenergy
                </p>
                <div>
                    <Button className="bg-white text-purple-600 rounded-lg hover:text-white hover:bg-primary" onClick={handleFeature}>
                        Get Featured
                    </Button>
                </div>
            </div>
        </Card>
    );
}
