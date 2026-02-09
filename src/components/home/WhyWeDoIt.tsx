"use client";
import { motion } from "framer-motion";

export default function WhyWeDoIt() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const info = [
    {
      val: "95%",
      title: "Creator Satisfaction Rate"
    },
    {
      val: "$12M+",
      title: "Paid to Creators"
    },
    {
      val: "50K+",
      title: "Successful Campaigns"
    },
    {
      val: "4.9★",
      title: "Average Rating"
    }
  ];

  return (
    <div className="bg-primary">
      <div className="flex px-6 py-10">
        {/* Right Column  */}
        <motion.div
          className="flex flex-col space-y-6 w-full"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white">
            Why We Do It
          </h2>

          <div className="mt-6 w-full">
            <p className="text-md leading-relaxed mb-3 text-white font-light">
              We believe in the power of authentic connections. In a world saturated with generic advertising, real creators sharing genuine experiences make all the difference.
            </p>

            <p className="text-dm leading-relaxed mb-3 text-white font-light">
              Our platform was built to democratize influencer marketing, giving creators of all sizes access to meaningful brand partnerships and providing brands with authentic voices that resonate with their audience.
            </p>

            <p className="text-md leading-relaxed text-white font-light">
              Every collaboration facilitated through Influenergy represents a step toward a more authentic, transparent, and effective marketing ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {info.map((ele, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-white bg-[#FFFFFF1A] px-6 py-8 rounded-xl"
              >
                <h2 className="text-3xl font-bold">{ele.val}</h2>
                <p className="text-sm opacity-80">{ele.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
