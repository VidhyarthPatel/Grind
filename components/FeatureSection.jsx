"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAnimation from "./textAnimation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function FeatureSection() {
  const containerRef = useRef(null);
  const canRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        canRef.current,
        { y: "-100vh", scale: 0.6 },
        {
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#F3ECD6] pt-24 pb-8 md:py-32 overflow-hidden min-h-[85vh] md:min-h-screen"
    >
      {/* Huge Background Text */}
      <div className="absolute top-12 md:top-16 left-1/2 -translate-x-1/2 w-full text-center z-0 pointer-events-none select-none flex justify-center">
        <TextAnimation>
          <h1 className="font-fedro text-[15vw] sm:text-[14vw] md:text-[12vw] lg:text-[11vw] font-black leading-[0.8] text-[#4E3629] tracking-tighter whitespace-nowrap opacity-90">
            COLD BREW
          </h1>
        </TextAnimation>
      </div>

      <div className="relative z-10 mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end mt-16 md:mt-24 min-h-[400px]">
        {/* Bottom Left Image */}
        <div className="hidden md:flex flex-col justify-end items-start w-full md:w-1/3 mb-8 md:mb-16 z-10">
          <div className="w-full h-full aspect-[4/3] relative rounded-[28px] shadow-xl">
            <Image
              src="/coffee pour.png"
              alt="Pouring drink"
              // fill
              height={600}
              width={600}
              className="object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Bottom Right Text */}
        <div className="flex flex-col justify-end w-full md:w-1/3 mb-2 md:mb-16 z-10 mt-[280px] sm:mt-[340px] md:mt-0 text-center md:text-left">
          <TextAnimation>
            <h3 className="font-fedro text-[2.5rem] sm:text-[3rem] lg:text-[4rem] leading-[1.1] text-[#302030] mb-6 font-semibold tracking-tight">
              Cold Brew?
              <br />
              Let<span className="font-inter">'</span>s Get Into It.
            </h3>
          </TextAnimation>
          <TextAnimation>
            <p className="font-sans text-[18px] sm:text-[20px] lg:text-[22px] text-[#302030] opacity-80 leading-relaxed max-w-[480px] mx-auto md:mx-0">
              It's not what you think. Our signature cold brew means taking your
              standard robust base and mixing in flavors like vanilla, mocha, or
              cherry—with sweet cream to finish. The possibilities are truly
              endless!
            </p>
          </TextAnimation>
        </div>
      </div>

      {/* Center Large Image (Absolute) */}
      <div 
        ref={canRef}
        className="absolute top-[8%] md:top-[10%] lg:top-[16%] left-1/2 -translate-x-1/2 flex justify-center pointer-events-none z-20"
      >
        <div
          className="w-[260px] sm:w-[340px] md:w-[440px] lg:w-[600px] xl:w-[700px] aspect-square relative drop-shadow-[0_40px_50px_rgba(0,0,0,0.3)] pointer-events-auto hover:scale-[1.02] transition-transform duration-500"
        >
          <Image
            src="/venilla .png"
            alt="Cold Brew Special"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
