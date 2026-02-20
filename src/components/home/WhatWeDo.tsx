"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "../ui/card";

export default function WhatWeDo() {
  const cardData = [
    {
      icon: "https://d20cf3kfv1a9jn.cloudfront.net/images/sparkle.png",
      title: "AI-Powered Matching",
      description:
        "Enter your campaign goals and budget, and our AI instantly matches you with high-fit creators based on audience alignment, past performance, and fair pricing no manual vetting or cold outreach required.",
      delay: 0.2,
    },
    {
      icon: "https://d20cf3kfv1a9jn.cloudfront.net/images/bulb.png",
      title: "Paid Campaign With Creators",
      description:
        "Launch with structured briefs, defined deliverables, and transparent pricing upfront so both brands and creators stay aligned, reduce revisions, and execute faster as quick as three days.",
      delay: 0.4,
    },
    {
      icon: "https://d20cf3kfv1a9jn.cloudfront.net/images/payment.png",
      title: "Streamlined Contracts & Payouts",
      description:
        "Built-in contracts and payment workflows eliminate Net-30 and Net-60 delays, helping creators get paid faster while brands operate with clear scope and smoother transactions.",
      delay: 0.6,
    },
  ];

  return (
    <div className="bg-white w-full mt-[10%] lg:mt-[5%]">
      <div className="flex flex-col lg:flex-row w-full px-6 lg:px-20 xl:px-24 gap-8 lg:gap-12 items-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full"
        >
          {/* Section Heading */}
          <div className="flex flex-col justify-start items-center mb-8 gap-4">
            <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-[#352547]">
              What We Do
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-3xl text-center">
              We provide a comprehensive platform that connects creators with brands, streamlines collaboration, and drives results.
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
                <Card className="p-5 bg-white flex flex-col gap-4 h-full transform transition-all duration-300 hover:shadow-lg border border-gray-300">
                  <div className="bg-white rounded-full flex flex-col lg:flex-row shadow-sm gap-4 items-center">
                    <div className="w-14 h-14 flex items-center justify-center bg-[#F3E8FF] rounded-lg">
                      <Image
                        src={card.icon}
                        width={32}
                        height={32}
                        alt={card.title}
                      />
                    </div>

                    <h2 className="text-lg font-bold mt-4 md:mt-5 lg:mt-0">
                      {card.title}
                    </h2>
                  </div>
                  <div>
                    <p className="text-gray-600 mt-2 text-sm">
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
