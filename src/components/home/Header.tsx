"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { setUserType } from "@/store/features/authSlice";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  // Separate refs for mobile and desktop dropdown containers
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleUserTypeSelection = (type: string, link: string) => {
    setLoginDropdownOpen(false);
    setMenuOpen(false); // Close mobile menu when selecting user type
    router.push(`${link}`);
    dispatch(setUserType(type));
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node;
      const clickedInsideMobile = mobileDropdownRef.current?.contains(targetNode);
      const clickedInsideDesktop = desktopDropdownRef.current?.contains(targetNode);
      if (!clickedInsideMobile && !clickedInsideDesktop) {
        setLoginDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    const bookingUrl = "https://calendly.com/influenergy/30min";
    if (typeof window !== "undefined" && window.Calendly) {
      try {
        if (typeof window.Calendly.closePopupWidget === "function") {
          window.Calendly.closePopupWidget();
        }
        if (typeof window.Calendly.initPopupWidget === "function") {
          setTimeout(() => {
            window.Calendly.initPopupWidget({ url: bookingUrl });
          }, 0);
          return;
        }
      } catch { }
    }
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <header className="flex flex-wrap justify-between items-center w-full h-auto py-4 px-6 shadow-md sticky top-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100 z-50">
      {/* Logo */}
      <Link href="/" className="inline-flex items-center">
        <Image src="/images/logo.svg" alt="Influenergy" width={150} height={150} className="w-28 h-auto lg:w-36" />
      </Link>

      {/* Mobile menu button */}
      <div className="flex gap-2 md:gap-6 lg:hidden items-center">

        <div className="relative lg:hidden" ref={mobileDropdownRef}>
          <Button
            className="text-primary bg-transparent rounded-xl px-6 py-3 hover:text-white hover:bg-primary transition-colors flex items-center gap-1"
            onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
          >
            Login
            {loginDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {loginDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 md:w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <Button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full bg-transparent border-none shadow-none cursor-pointer"
                onClick={() => {
                  // console.log("clicked")
                  handleUserTypeSelection("brand", "/login")
                }}
              >
                Brand
              </Button>
              <Button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full bg-transparent border-none shadow-none cursor-pointer"
                onClick={() => handleUserTypeSelection("creator", "/login")}
              >
                Creator
              </Button>
            
            </div>
          )}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {menuOpen ? <span className="text-xl leading-none">✕</span> : <span className="text-2xl leading-none">☰</span>}
        </button>

        {/* Navigation */}
        <nav
          className={`w-full lg:w-auto ${menuOpen ? "block" : "hidden"} lg:block mt-4 md:mt-0 ${menuOpen ? "absolute left-0 top-full bg-white border-t border-gray-100 shadow-lg z-40" : ""}`}
        >
          <ul className={`text-lg font-medium ${menuOpen ? "flex flex-col gap-4 p-4 divide-y divide-gray-100" : "flex flex-col md:flex-row gap-4"}`}>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <li>
                <Link href="/#blog" className="hover:text-primary transition-colors block py-2">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#get-in-touch" className="hover:text-primary transition-colors block py-2">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#we-empower-brand" className="hover:text-primary transition-colors block py-2">
                  About Us
                </Link>
              </li>
            </div> */}

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-2 mt-2">
              <li className="lg:hidden">
                <Button
                  onClick={handleClick}
                  className="w-full text-left px-4 py-2 bg-transparent text-primary hover:text-primary/80"
                >
                  Get a Demo
                </Button>
              </li>
              <li className="lg:hidden">
                <Link href="/get-started">
                  <Button className="w-full bg-primary text-white rounded-xl px-4 py-2">
                    Start For Free
                  </Button>
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>

      <nav
        className={`w-full lg:w-auto ${menuOpen ? "block" : "hidden"} lg:block mt-4 md:mt-0 ${menuOpen ? "absolute left-0 top-full bg-white border-t border-gray-100 shadow-lg z-40" : ""}`}
      >
        <ul className={`text-lg font-medium ${menuOpen ? "flex flex-col gap-4 p-4 divide-y divide-gray-100" : "flex flex-col md:flex-row gap-4"}`}>
          {/* <div className="flex flex-col sm:flex-row gap-4">
            <li>
              <Link href="/#blog" className="hover:text-primary transition-colors block py-2">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/#get-in-touch" className="hover:text-primary transition-colors block py-2">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/#we-empower-brand" className="hover:text-primary transition-colors block py-2">
                About Us
              </Link>
            </li>
          </div> */}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-2 mt-2">
            <li className="lg:hidden">
              <Button
                onClick={handleClick}
                className="w-full text-left px-4 py-2 bg-transparent text-primary hover:text-primary/80"
              >
                Get a Demo
              </Button>
            </li>
            <li className="lg:hidden">
              <Link href="/get-started">
                <Button className="w-full bg-primary text-white rounded-xl px-4 py-2">
                  Start For Free
                </Button>
              </Link>
            </li>
          </div>
        </ul>
      </nav>

      {/* Desktop Buttons remain unchanged */}
      <div className="hidden lg:flex justify-center items-center gap-3">
        <div>
          <Button
            className="bg-transparent text-primary hover:text-white"
            onClick={handleClick}
          >
            Get a Demo
          </Button>
        </div>
        <div className="relative" ref={desktopDropdownRef}>
          <Button
            className="text-primary bg-transparent rounded-xl px-6 py-3 hover:text-white hover:bg-primary transition-colors flex items-center gap-1"
            onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
          >
            Login
            {loginDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {loginDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 md:w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <Button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full bg-transparent border-none shadow-none cursor-pointer"
                onClick={() => handleUserTypeSelection("brand", "/login")}
              >
                Brand
              </Button>
              <Button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full bg-transparent border-none shadow-none cursor-pointer"
                onClick={() => handleUserTypeSelection("creator", "/login")}
              >
                Creator
              </Button>
            </div>
          )}
        </div>
        <Link href="/get-started">
          <Button className="bg-primary text-white rounded-xl px-6 py-3">
            Start For Free
          </Button>
        </Link>
      </div>
    </header>
  );
}
