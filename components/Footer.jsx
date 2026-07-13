"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import TextAnimation from "./textAnimation";
import HoverStagger from "./HoverStagger";

export default function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="fixed bottom-0 left-0 w-full h-screen z-0 bg-[#111] text-[#F3ECD6] flex flex-col justify-between overflow-hidden"
    >
      {/* Top Content */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start p-8 md:p-16 lg:p-24 pt-32 gap-12">
        {/* Newsletter / CTA */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {isVisible && (
            <>
              <TextAnimation animateOnScroll={false}>
                <h3 className="font-fedro text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.9]">
                  Stay<br />Grounded
                </h3>
              </TextAnimation>
              <TextAnimation animateOnScroll={false} delay={0.15}>
                <p className="font-sans text-lg md:text-xl opacity-80 max-w-sm font-medium">
                  Subscribe to our newsletter for exclusive drops, early access, and coffee culture.
                </p>
              </TextAnimation>
            </>
          )}
          {!isVisible && (
            <>
              <h3 className="font-fedro text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.9] invisible">
                Stay<br />Grounded
              </h3>
              <p className="font-sans text-lg md:text-xl opacity-80 max-w-sm font-medium invisible">
                Subscribe to our newsletter for exclusive drops, early access, and coffee culture.
              </p>
            </>
          )}
          <div className="flex w-full max-w-md border-b-2 border-[#F3ECD6]/30 pb-2 mt-4 relative group">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-transparent border-none outline-none text-[#F3ECD6] font-sans font-medium text-lg w-full placeholder:text-[#F3ECD6]/50 transition-colors focus:placeholder:text-transparent"
            />
            <button className="font-fedro uppercase text-xl md:text-2xl hover:text-[#C89E78] transition-colors absolute right-0 bottom-2">
              Join
            </button>
            <div className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#C89E78] transition-all duration-500 ease-out group-focus-within:w-full" />
          </div>
        </div>

        {/* Links Grid */}
        <div className="w-full md:w-1/2 flex justify-start md:justify-end gap-16 md:gap-32">
          <div className="flex flex-col gap-4 font-fedro text-2xl md:text-3xl uppercase">
            <Link href="#" className="hover:text-[#C89E78] transition-colors"><HoverStagger>Shop</HoverStagger></Link>
            <Link href="#" className="hover:text-[#C89E78] transition-colors"><HoverStagger>Our Story</HoverStagger></Link>
            <Link href="#" className="hover:text-[#C89E78] transition-colors"><HoverStagger>Locations</HoverStagger></Link>
            <Link href="#" className="hover:text-[#C89E78] transition-colors"><HoverStagger>Journal</HoverStagger></Link>
          </div>
          <div className="flex flex-col gap-4 font-fedro text-2xl md:text-3xl uppercase">
            <Link href="#" className="hover:text-[#C89E78] transition-colors"><HoverStagger>Instagram</HoverStagger></Link>
            <Link href="#" className="hover:text-[#C89E78] transition-colors"><HoverStagger>TikTok</HoverStagger></Link>
            <Link href="#" className="hover:text-[#C89E78] transition-colors"><HoverStagger>Twitter</HoverStagger></Link>
            <Link href="#" className="hover:text-[#C89E78] transition-colors"><HoverStagger>Contact</HoverStagger></Link>
          </div>
        </div>
      </div>

      {/* Massive Bottom Text */}
      <div className="w-full px-4 md:px-8 pb-4 md:pb-8 flex flex-col items-center">
        {isVisible ? (
          <TextAnimation animateOnScroll={false} delay={0.3}>
            <h1 className="font-fedro text-[28vw] md:text-[24vw] leading-[0.75] text-[#F3ECD6] tracking-tighter uppercase w-full text-center">
              Grind
            </h1>
          </TextAnimation>
        ) : (
          <h1 className="font-fedro text-[28vw] md:text-[24vw] leading-[0.75] text-[#F3ECD6] tracking-tighter uppercase w-full text-center invisible">
            Grind
          </h1>
        )}
        <div className="w-full flex justify-between items-center mt-4 font-sans text-xs md:text-sm uppercase tracking-widest opacity-60 px-4">
          <span>© {new Date().getFullYear()} Grind Coffee Co.</span>
          <span>Terms & Privacy</span>
        </div>
      </div>
    </footer>
  );
}
