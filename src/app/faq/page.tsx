"use client";
import Header from "@/components/home/Header";
import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import { faqData } from "@/constants/faq-data";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [showAll, setShowAll] = useState(false);
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row items-center justify-around bg-white p-6 w-full">
        <Image
          src="/images/Faq/faq.png"
          alt=""
          width={500}
          height={500}
          className="mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">How Can We Help You?</h1>
      </div>

      {/* FAQ Items */}

      <div className="w-full max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4 text-center"
        >
          Frequently Asked Questions
        </motion.h2>

        <Accordion.Root
          type="single"
          collapsible
          value={openItem}
          onValueChange={(value) =>
            setOpenItem(value === openItem ? undefined : value)
          }
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
        >
          {/* First 6 FAQs with staggered animation */}
          <AnimatePresence>
            {faqData.slice(0, 6).map((faq, index) => (
              <motion.div
                key={`initial-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Accordion.Item
                  value={`item-${faq.id}`}
                  className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 ease-in-out self-start"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center gap-4 font-semibold text-lg text-black">
                      <motion.span
                        className="ml-2"
                        animate={{
                          rotate: openItem === `item-${faq.id}` ? 0 : 0,
                        }}
                      >
                        {openItem === `item-${faq.id}` ? (
                          <Minus className="w-5 h-5 text-green-600" />
                        ) : (
                          <Plus className="w-5 h-5 text-black" />
                        )}
                      </motion.span>
                      <span className="text-sm">{faq.trigger}</span>
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <AnimatePresence>
                    <Accordion.Content className="overflow-hidden">
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: openItem === `item-${faq.id}` ? "auto" : 0,
                          opacity: openItem === `item-${faq.id}` ? 1 : 0,
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-4 text-gray-500 text-sm leading-relaxed"
                      >
                        {faq.content}
                      </motion.div>
                    </Accordion.Content>
                  </AnimatePresence>
                </Accordion.Item>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Additional FAQs with show/hide animation */}
          <AnimatePresence>
            {showAll &&
              faqData.slice(6).map((faq, index) => (
                <motion.div
                  key={`additional-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="overflow-hidden"
                >
                  <Accordion.Item
                    value={`item-${faq.id}`}
                    className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 ease-in-out self-start mb-4"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="flex w-full items-center gap-4 font-semibold text-lg text-black">
                        <motion.span
                          className="ml-2"
                          animate={{
                            rotate: openItem === `item-${faq.id}` ? 0 : 0,
                          }}
                        >
                          {openItem === `item-${faq.id}` ? (
                            <Minus className="w-5 h-5 text-green-600" />
                          ) : (
                            <Plus className="w-5 h-5 text-black" />
                          )}
                        </motion.span>
                        <span className="text-sm">{faq.trigger}</span>
                      </Accordion.Trigger>
                    </Accordion.Header>

                    <AnimatePresence>
                      <Accordion.Content className="overflow-hidden">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: openItem === `item-${faq.id}` ? "auto" : 0,
                            opacity: openItem === `item-${faq.id}` ? 1 : 0,
                          }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="mt-4 text-gray-500 text-sm leading-relaxed"
                        >
                          {faq.id !== 7 ? (
                            faq.content
                          ) : (
                            <>
                              We made it simple for you, check it out:{" "}
                              <Link
                                href="https://www.youtube.com/shorts/Xu-eblECmDI"
                                target="_blank"
                                className="text-blue-500 underline"
                              >
                                Aren’t UGC Creators and Influencers the same
                                thing? 😂 - YouTube
                              </Link>
                            </>
                          )}
                        </motion.div>
                      </Accordion.Content>
                    </AnimatePresence>
                  </Accordion.Item>
                </motion.div>
              ))}
          </AnimatePresence>
        </Accordion.Root>

        {/* View All Button with animation */}
        <motion.div
          className="w-full flex justify-center items-center my-10"
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="bg-primary text-white font-bold py-2 px-6 rounded-lg mt-4 mx-auto relative overflow-hidden min-w-[120px]"
            transition={{ duration: 0.3 }}
          >
            <span className="block text-center">
              {showAll ? "View Less" : "View All"}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
