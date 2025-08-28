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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();


  const handleUserTypeSelection = (type: string, link: string) => {
    console.log(type, link);
    setLoginDropdownOpen(false);
    router.push(`${link}`);
    dispatch(setUserType(type));
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex flex-wrap justify-between items-center w-full h-auto py-4 px-6 shadow-md relative z-50">
      {/* Logo */}
      <Link href="/">
        <Image src="/images/logo.svg" alt="" width={150} height={150} />
      </Link>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-2xl focus:outline-none"
      >
        ☰
      </button>

      {/* Navigation */}
      <nav
        className={`w-full md:w-auto ${menuOpen ? "block" : "hidden"
          } md:block mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row gap-6 text-lg font-medium">
          <li>
            <Link href="/#blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/#get-in-touch" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Button */}
      <div className="hidden md:flex justify-center items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <Button
            className="text-primary bg-transparent rounded-xl px-6 py-3 hover:text-white hover:bg-primary transition-colors flex items-center gap-1"
            onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
          >
            Login
            {loginDropdownOpen ? <ChevronUp className=" h-4 w-4" /> : <ChevronDown className=" h-4 w-4" />}
          </Button>

          {/* Dropdown Menu */}
          {loginDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 md:w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="">
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
            </div>
          )}
        </div>
        <Link href="/get-started">
          <Button className="bg-primary text-white rounded-xl px-6 py-3">
            Start For Free
          </Button>
        </Link>
      </div>

      {/* Mobile button */}
      {menuOpen && (
        <div className="w-full md:hidden mt-4">
          <Link href="/get-started">
            <Button className="w-full bg-primary text-white rounded-xl py-3">
              Start For Free
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
