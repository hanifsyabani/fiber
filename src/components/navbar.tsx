"use client";
import { useEffect, useState } from "react";
import { SlCalculator } from "react-icons/sl";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const height = window.innerHeight;

      if (scrollTop > height * 0.1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`${
        scrolled ? "bg-[#000208]" : "bg-transparent"
      } w-full fixed z-10  transition-all py-5 px-14`}
    >
      <div className="flex items-center gap-2">
        <SlCalculator size={20} className="text-white"/>
        <h1 className="text-white font-bold text-base">OptiCalc</h1>
      </div>
    </nav>
  );
}
