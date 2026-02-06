"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "../ui/card";

export default function WhatWeDo() {
  const cardData = [
    {
      icon: "https://d20cf3kfv1a9jn.cloudfront.net/images/sparkle.png",
      title: "Brand Discovery",
      description:
        "Connect with cutting-edge brands that align with your values, audience, and content style. Our smart matching algorithm finds the perfect partnerships.",
      delay: 0.2,
    },
    {
      icon: "https://d20cf3kfv1a9jn.cloudfront.net/images/bulb.png",
      title: "Seamless Collaboration",
      description:
        "Manage campaigns, communications, and deliverables all in one place. Streamlined workflows make collaboration effortless and productive.",
      delay: 0.4,
    },
    {
      icon: "https://d20cf3kfv1a9jn.cloudfront.net/images/payment.png",
      title: "Create Quick Campaigns",
      description:
        "Track your performance with detailed analytics and insights. Grow your influence with data-driven recommendations and campaign optimization.",
      delay: 0.6,
    },
  ];

  return (
    <div className="bg-white w-full">
      <div className="flex flex-col lg:flex-row w-full px-6 lg:px-20 xl:px-24 py-6 md:py-10 lg:py-16 gap-8 lg:gap-12 items-center max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full"
        >
          {/* Section Heading */}
          <div className="flex flex-col justify-start mb-8">
            <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-[#352547]">
              What We Do
            </h1>
            <p className="text-gray-900 text-sm md:text-base leading-relaxed">
              We simplify the process of connecting with high-performing UGC
              creators through AI-powered matchmaking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 w-full mt-4">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: card.delay }}
                viewport={{ once: true }}
              >
                <Card className="p-4 bg-white flex flex-col gap-4 h-full transform transition-all duration-300 hover:shadow-lg">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Image
                      src={card.icon}
                      width={35}
                      height={35}
                      alt={card.title}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mt-4 md:mt-5">{card.title}</h2>
                    <p className="text-gray-900 text-sm mt-2 ">
                      {card.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
