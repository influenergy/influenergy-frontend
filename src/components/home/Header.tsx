"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex flex-wrap justify-between items-center w-full h-auto py-4 px-6 shadow-md z-10">
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
        className={`w-full md:w-auto ${
          menuOpen ? "block" : "hidden"
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
        <Link href="/get-started">
          <Button className="bg-primary text-white rounded-xl px-6 py-3">
            Start Free Trial
          </Button>
        </Link>
      </div>

      {/* Mobile button */}
      {menuOpen && (
        <div className="w-full md:hidden mt-4">
          <Link href="/get-started">
            <Button className="w-full bg-primary text-white rounded-xl py-3">
              Start Free Trial
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
