import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-primary py-16 px-4 sm:px-6 lg:px-8 relative w-full">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Subscribe to our Newsletter
          </h2>
          <p className="mt-3 max-w-2xl text-xl font-light text-white sm:mt-4">
            Subscribe for Updates: Stay informed about the latest brand updates,
            influencers and announcements by subscribing to our newsletter.
          </p>
        </div>

        <div className="mt-8 w-full max-w-xl">
          <motion.form
            className="flex flex-col sm:flex-row"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative flex-grow">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="block w-full px-5 py-4 rounded-xl sm:rounded-r-none text-base text-gray-900 bg-white 
                  placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-white 
                  focus:border-transparent border-0 transition-all duration-300"
                required
                disabled={isSubmitting || isSubscribed}
                aria-label="Email address"
              />
              {isSubscribed && (
                <motion.div
                  className="absolute inset-y-0 right-4 flex items-center text-green-500"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || isSubscribed || !email}
              className={`px-6 py-4 sm:py-4 mt-4 sm:mt-0 rounded-xl sm:rounded-l-none font-semibold 
                flex items-center justify-center gap-2 transition-all duration-300 
                ${
                  isSubscribed
                    ? "bg-green-500 text-white"
                    : "bg-white text-primary hover:bg-gray-100"
                } 
                disabled:opacity-70`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : isSubscribed ? (
                "Subscribed!"
              ) : (
                <>Subscribe</>
              )}
            </motion.button>
          </motion.form>

          {/* Success message */}
          {isSubscribed && (
            <motion.p
              className="mt-2 text-sm text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Thank you for subscribing! Check your inbox for updates.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
