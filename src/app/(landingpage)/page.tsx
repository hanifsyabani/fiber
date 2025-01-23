'use client'

import Calculator from "@/components/calculator/calculator";
import HeroSection from "@/components/head";
import React, { useRef } from "react";

export default function page() {

  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      {/* <HeroSection onButtonClick={scrollToCalculator} /> */}
      <div ref={calculatorRef}>
        <Calculator />
      </div>
    </>
  )
}
