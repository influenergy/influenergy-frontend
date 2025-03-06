"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const socialLinks = [
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "#",
      bgColor: "bg-primary",
      textColor: "text-white",
    },
    {
      icon: <Youtube className="h-5 w-5" />,
      href: "#",
      bgColor: "bg-white",
      textColor: "text-primary",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "#",
      bgColor: "bg-white",
      textColor: "text-primary",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Get Started", href: "/get-started" },
  ];

  return (
    <motion.footer
      className="w-full bg-black text-white py-16 md:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Quick Contact */}
          <motion.div
            className="space-y-5 text-center md:text-left"
            variants={item}
          >
            <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
            <div className="h-0.5 w-16 bg-white mx-auto md:mx-0"></div>
            <p className="text-gray-300 font-light">
              123 Tech Avenue, Silicon Valley, <br />
              CA 94043, United States
            </p>
            <p className="text-gray-300 font-light">+1 (555) 123-4567</p>
            <p className="text-gray-300 font-light">contact@influenergy.com</p>
          </motion.div>

          {/* Company Info */}
          <motion.div className="space-y-5 w-full" variants={item}>
            <div className="mb-6 w-full flex justify-center">
              <Image
                src="/images/logo.svg"
                alt="Influenergy Logo"
                width={180}
                height={50}
                className="object-cover"
              />
            </div>
            <p className="text-gray-300 text-center font-light">
              Influenergy is the AI-powered bridge between brands and UGC
              creators. We simplify the influencer collaboration process by
              automating creator-brand matching and maximizing campaign impact.
            </p>

            <div className="flex justify-center space-x-4 mt-8">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className={`${link.bgColor} ${link.textColor} transition-colors p-2.5 rounded-full hover:scale-105 flex items-center justify-center`}
                  >
                    {link.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-5 text-center md:text-left"
            variants={item}
          >
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <div className="h-0.5 w-16 bg-white mx-auto md:mx-0"></div>
            <ul className="space-y-3 font-light">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Influenergy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-400 text-sm hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-400 text-sm hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
