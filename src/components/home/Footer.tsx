"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentPath } from "@/utils/navigation";

export default function Footer() {
  const router = useRouter();

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
      href: "https://www.instagram.com/influenergy/",
      bgColor: "bg-white",
      textColor: "text-primary",
    },
    {
      icon: <Youtube className="h-5 w-5" />,
      href: "https://www.youtube.com/@Influenergy",
      bgColor: "bg-white",
      textColor: "text-primary",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/company/influenergy-marketing/",
      bgColor: "bg-white",
      textColor: "text-primary",
    },
  ];

  // Function to handle smooth scrolling
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    // Check if we're on the home page
    if (getCurrentPath() !== "/") {
      // If not on home page, navigate to home and then scroll
      router.push(`/?scrollTo=${targetId}`);
      return;
    }

    // Get the target element
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Scroll smoothly to the element
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const quickLinks = [
    { name: "Who We Are", href: "#who-we-are", section: "who-we-are" },
    { name: "What We Do", href: "#what-we-do", section: "what-we-do" },
    { name: "How It Works", href: "#how-it-works", section: "how-it-works" },
    { name: "Why We do It", href: "#why-we-do-it", section: "why-we-do-it" },
    { name: "Blogs", href: "#blog", section: "blog" },
    { name: "Contact", href: "#get-in-touch", section: "get-in-touch" },
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
            className="space-y-4 text-center w-full flex flex-col items-center justify-start gap-4"
            variants={item}
          >
            <h3 className="text-xl font-semibold ">Quick Contact</h3>
            <div className="border h-0.5 bg-gray-400 w-full" />
            <div className="flex flex-col px-10">
              <p className="text-gray-300 font-light">
                Contact Influenergy for any inquiries or questions
              </p>
              <p className="text-gray-300 font-light mt-5">connect@influenergy.co</p>
            </div>
          </motion.div>

          {/* Company Info */}
          <motion.div
            className="space-y-4 w-full flex flex-col items-center justify-center"
            variants={item}
          >
            <div className="mb-6 w-full flex justify-center">
              <Image
                src="/images/logo.svg"
                alt="Influenergy Logo"
                width={380}
                height={380}
                className="object-cover"
              />
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className={`${link.bgColor} ${link.textColor} hover:text-white hover:bg-primary transition-colors p-2.5 rounded-full hover:scale-105 flex items-center justify-center`}
                  >
                    {link.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4 text-center md:text-left flex flex-col items-center justify-start"
            variants={item}
          >
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            {/* <hr className="border border-gray-400 w-full" />
             */}
            <div className="h-0.5 bg-gray-400 w-full"/>
            <ul className="space-y-3 font-light">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.section ? (
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors inline-block"
                      onClick={(e) => handleSmoothScroll(e, link.section)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  )}
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
            © All Rights Reserved 2024. Influenergy LLC.
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
            <Link
              href="faqs"
              className="text-gray-400 text-sm hover:text-primary transition-colors"
            >
              FAQ’s
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
