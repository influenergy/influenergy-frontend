"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ 
      ...prev,
      [id]: value,
    }));
  };

  return (
    <motion.div
      className="bg-[#F4F3FF] w-full py-10 px-6 md:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="mb-12 md:mb-16 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-gray-600 font-medium text-xl md:text-2xl mb-3">
            Get Started
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
            Get in touch with us.<br className="hidden md:block" /> We are 
            here to assist you.
          </h2>
        </motion.div>

        {/* Form Section */}
        <div className="max-w-7xl">
          {submitted ? (
            <motion.div
              className="text-center py-16 bg-white rounded-lg shadow-sm p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <motion.div
                  className="text-primary text-7xl mb-6 flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 20, 0] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  ✓
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Your message has been sent successfully. We will get back to you
                  soon.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Send Another Message
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                setIsSubmitting(true);

                // Simulate form submission
                setTimeout(() => {
                  setIsSubmitting(false);
                  setSubmitted(true);
                }, 1500);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-5 h-14 border-0 border-b border-gray-400 shadow-none rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    required
                  />
                  <div className="absolute h-0.5 w-0 bg-primary bottom-0 left-0 transition-all duration-300 peer-focus:w-full"></div>
                </div>

                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-5 h-14 border-0 border-b border-gray-400 shadow-none rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (optional)"
                    className="w-full px-4 py-5 h-14 border-0 border-b border-gray-400 shadow-none rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="w-full px-4 py-5 border-0 border-b border-gray-400 shadow-none rounded-none bg-transparent min-h-[150px] focus-visible:ring-0 focus-visible:border-primary transition-colors resize-none"
                  required
                />
              </div>

              <motion.div
                className="flex justify-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-white h-14 px-8 py-5 rounded-full flex items-center justify-center gap-3 text-base font-medium transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      <span>Sending...</span>
                    </span>
                  ) : (
                    <>
                      Leave us a Message
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GetInTouch;
