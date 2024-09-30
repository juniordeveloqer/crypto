"use client"; // Sadece bu dosyada client-side rendering kullanılıyor

import { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypedAnimation = () => {
  const typedElement = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typedElement.current) {
      const typed = new Typed(typedElement.current, {
        strings: ["Fast.", "Secure.", "Simple."],
        typeSpeed: 100,
        backSpeed: 50,
        startDelay: 500,
        backDelay: 1000,
        loop: true,
        showCursor: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <span className="text-[64px] typed-cursor" ref={typedElement}></span>
  );
};

export default TypedAnimation;
