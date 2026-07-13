"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAnimation from "./textAnimation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SourcingSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const plants = gsap.utils.toArray(".parallax-plant");
      plants.forEach((plant) => {
        const speed = parseFloat(plant.dataset.speed) || 1;
        gsap.to(plant, {
          y: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-[#F3ECD6] flex flex-col justify-center items-center py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Scattered Coffee Plants */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Plant 1 (Top Left) */}
        <div
          data-speed="1.2"
          className="parallax-plant absolute top-[2%] left-[-2%] md:top-[5%] md:left-[2%] w-[150px] md:w-[220px] aspect-[4/5] drop-shadow-2xl rotate-[-2deg]"
        >
          <Image
            src="/coffee plantes - 1.webp"
            alt="Coffee Plant 1"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Plant 2 (Top Right) */}
        <div
          data-speed="1.8"
          className="parallax-plant absolute top-[-5%] right-[2%] md:top-[0%] md:right-[5%] w-[120px] md:w-[160px] aspect-square drop-shadow-2xl rotate-[18deg]"
        >
          <Image
            src="/coffee plantes - 2.webp"
            alt="Coffee Plant 2"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Plant 3 (Mid Left) */}
        <div
          data-speed="2.5"
          className="parallax-plant absolute top-[45%] left-[-5%] md:top-[45%] md:left-[-2%] w-[100px] md:w-[140px] aspect-square drop-shadow-2xl rotate-[2deg]"
        >
          <Image
            src="/coffee plantes - 3.jpeg"
            alt="Coffee Plant 3"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Plant 4 (Mid Right) */}
        <div
          data-speed="1.5"
          className="parallax-plant absolute top-[40%] right-[-5%] md:top-[40%] md:right-[-2%] w-[120px] md:w-[180px] aspect-square drop-shadow-2xl rotate-[-2deg]"
        >
          <Image
            src="/coffee plantes - 4.jpg"
            alt="Coffee Plant 4"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Plant 5 (Bottom Left) */}
        <div
          data-speed="2.0"
          className="parallax-plant absolute bottom-[5%] left-[0%] md:bottom-[5%] md:left-[2%] w-[150px] md:w-[220px] aspect-[4/5] drop-shadow-2xl rotate-[0deg]"
        >
          <Image
            src="/coffee plantes - 5.jpeg"
            alt="Coffee Plant 5"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Plant 6 (Bottom Right) */}
        <div
          data-speed="1.3"
          className="parallax-plant absolute bottom-[-5%] right-[0%] md:bottom-[-2%] md:right-[2%] w-[180px] md:w-[280px] aspect-[4/5] drop-shadow-2xl rotate-[15deg]"
        >
          <Image
            src="/coffee plantes - 6.jpg"
            alt="Coffee Plant 6"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>

      <div className="max-w-6xl w-full flex flex-col items-center justify-center z-10 relative">
        <TextAnimation>
          <h2 className="font-fedro text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5vw] leading-[1.1] text-[#111] uppercase font-black tracking-tight text-center flex flex-col gap-2 md:gap-4">
            {/* Line 1 */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <span>SOURCING</span>
              <div className="relative w-[20vw] md:w-[15vw] lg:w-[12vw] h-[10vw] md:h-[7vw] lg:h-[5.5vw] inline-block align-middle bg-[#4C5B42] overflow-hidden rounded-sm shadow-xl">
                <Image
                  src="/coffee bean.png"
                  alt="Coffee Beans"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Line 2 */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <div className="relative w-[20vw] md:w-[15vw] lg:w-[12vw] h-[10vw] md:h-[7vw] lg:h-[5.5vw] inline-block align-middle bg-[#A87950] overflow-hidden rounded-sm shadow-xl">
                <Image
                  src="/coffee bean.png"
                  alt="Coffee Beans"
                  fill
                  className="object-cover"
                />
              </div>
              <span>FINEST</span>
            </div>

            {/* Line 3 */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <span>COFFEE BEANS</span>
              <div className="relative w-[20vw] md:w-[15vw] lg:w-[12vw] h-[10vw] md:h-[7vw] lg:h-[5.5vw] inline-block align-middle bg-[#4C5B42] overflow-hidden rounded-sm shadow-xl">
                <Image
                  src="/coffee bean.png"
                  alt="Coffee Beans"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </h2>
        </TextAnimation>

        <TextAnimation>
          <p className="mt-12 md:mt-20 font-sans text-lg md:text-xl lg:text-2xl text-[#111] opacity-80 max-w-2xl text-center font-medium">
            We travel the world to find the most ethically sourced,
            single-origin beans. Every roast is a testament to our dedication to
            the craft.
          </p>
        </TextAnimation>
      </div>
    </section>
  );
}

export default SourcingSection;
