"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HistorySection, { ERAS } from "./HistorySection";
import TextAnimation from "./textAnimation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function EvolutionSection() {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const historyWrapperRef = useRef(null);
  const historySectionRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const historyEl = historySectionRef.current;
    if (!wrapper || !historyEl) return;

    // Grab animated elements from HistorySection
    const digitEls = [0, 1, 2, 3].map((pos) =>
      historyEl.querySelector(`[data-history-digit="${pos}"]`),
    );
    const eraEls = ERAS.map((_, i) =>
      historyEl.querySelector(`[data-history-era="${i}"]`),
    );
    const imageEls = ERAS.map((_, i) =>
      historyEl.querySelector(`[data-history-image="${i}"]`),
    );

    // Transition count — we have ERAS.length - 1 transitions
    const transitionCount = ERAS.length - 1; // 4

    // Layout: zoom takes 25%, then each era transition gets an equal slice of the remaining 70%
    // with a 5% buffer at the end
    const zoomEnd = 0.25;
    const transitionsStart = 0.30;
    const transitionsEnd = 0.95;
    const sliceSize = (transitionsEnd - transitionsStart) / transitionCount;

    let ctx = gsap.context(() => {
      // Parallax cans
      const cans = gsap.utils.toArray(".parallax-can");
      cans.forEach((can) => {
        const speed = parseFloat(can.dataset.speed) || 1;
        gsap.to(can, {
          y: -150 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Master Snap Trigger Array
      const snapPoints = [
        zoomEnd, // 1880 (after zoom)
        ...Array.from({ length: transitionCount }).map(
          (_, i) => transitionsStart + sliceSize * (i + 1),
        ), // 1909, 1958, 1991, 2016
        1.0, // Exit animation end
      ];

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.2, max: 0.8 },
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });

      // Phase 1: Un-crop (clip-path) animation
      masterTl.fromTo(
        historyWrapperRef.current,
        { clipPath: "inset(50%)" },
        { clipPath: "inset(0%)", ease: "none", duration: zoomEnd },
        0
      );

      // Phase 2+: Era transitions
      for (let t = 0; t < transitionCount; t++) {
        const fromIdx = t;
        const toIdx = t + 1;
        const start = transitionsStart + t * sliceSize;
        const duration = sliceSize;

        // Animate digit strips
        digitEls.forEach((el) => {
          if (el) {
            masterTl.to(
              el,
              {
                yPercent: -(100 / ERAS.length) * toIdx,
                duration: duration,
                ease: "power2.inOut",
              },
              start
            );
          }
        });

        // Fade out current era content
        masterTl.to(
          eraEls[fromIdx],
          {
            opacity: 0,
            y: -40,
            duration: duration * 0.45,
            ease: "power2.in",
          },
          start
        );

        // Slide out current era image
        masterTl.to(
          imageEls[fromIdx],
          {
            yPercent: -100,
            opacity: 1,
            scale: 1,
            duration: duration,
            ease: "power2.inOut",
          },
          start
        );

        // Fade in next era content
        masterTl.fromTo(
          eraEls[toIdx],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: duration * 0.45,
            ease: "power2.out",
          },
          start + duration * 0.55
        );

        // Slide in next era image
        masterTl.fromTo(
          imageEls[toIdx],
          { yPercent: 100, opacity: 1, scale: 1 },
          {
            yPercent: 0,
            duration: duration,
            ease: "power2.inOut",
          },
          start
        );
      }
      // Phase 3: Exit animation (from 0.95 to 1.0)
      // The history section scales down and rotates away like a falling card
      masterTl.to(
        historyWrapperRef.current,
        {
          scale: 0.75,
          rotation: -6,
          yPercent: 15,
          opacity: 0,
          duration: 1 - transitionsEnd,
          ease: "power2.inOut",
        },
        transitionsEnd
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={wrapperRef} className="relative" style={{ height: "1200vh" }}>
        <div
          ref={stickyRef}
          className="sticky top-0 w-full h-screen overflow-hidden bg-[#F3ECD6]"
        >
        {/* --- Evolution Content (Background layer) --- */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-start pt-16 sm:pt-24 md:justify-center md:pt-0">
          {/* Center Text */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl px-4">
            <TextAnimation>
              <h2 className="font-fedro text-[3.5rem] md:text-[5.5rem] lg:text-[7.5rem] leading-[0.9] text-[#111] uppercase font-bold tracking-tight mb-6">
                The Evolution
                <br />
                Of Grind
              </h2>
            </TextAnimation>
            <TextAnimation>
              <p className="font-sans text-[15px] md:text-[17px] text-[#111] opacity-80 max-w-sm">
                From a simple idea to a<br />
                modern coffee revolution
              </p>
            </TextAnimation>
          </div>

          {/* Scattered Images - 8 Cans */}
          {/* 1. Top Left (Matcha) */}
          <div
            data-speed="1.5"
            className="parallax-can absolute top-[10%] left-[8%] lg:left-[10%] w-[90px] md:w-[130px] lg:w-[170px] aspect-[1/2] drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] -rotate-[12deg] z-0 hidden sm:block"
          >
            <Image
              src="/matcha latte.png"
              alt="Matcha Latte"
              fill
              className="object-contain"
            />
          </div>

          {/* 2. Top Right (Vanilla) */}
          <div
            data-speed="1.8"
            className="parallax-can absolute top-[12%] right-[8%] lg:right-[10%] w-[100px] md:w-[140px] lg:w-[180px] aspect-[1/2] drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] rotate-[15deg] z-0 hidden sm:block"
          >
            <Image
              src="/venilla .png"
              alt="Vanilla Bean"
              fill
              className="object-contain"
            />
          </div>

          {/* 3. Mid Left (Pink Latte) */}
          <div
            data-speed="2.2"
            className="parallax-can absolute top-[45%] left-[2%] lg:left-[4%] w-[110px] md:w-[160px] lg:w-[210px] aspect-[1/2] drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)] -rotate-6 z-0"
          >
            <Image
              src="/pink lattee.png"
              alt="Pink Latte"
              fill
              className="object-contain"
            />
          </div>

          {/* 4. Mid Right (Mocha) */}
          <div
            data-speed="2.5"
            className="parallax-can absolute top-[48%] right-[2%] lg:right-[4%] w-[120px] md:w-[170px] lg:w-[230px] aspect-[1/2] drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)] rotate-6 z-0 hidden sm:block"
          >
            <Image
              src="/mocha bliss.png"
              alt="Mocha Bliss"
              fill
              className="object-contain"
            />
          </div>

          {/* 5. Bottom Left (Mocha 2) */}
          <div
            data-speed="1.2"
            className="parallax-can absolute bottom-[10%] left-[16%] lg:left-[20%] w-[80px] md:w-[120px] lg:w-[160px] aspect-[1/2] drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] -rotate-[15deg] z-0 hidden sm:block"
          >
            <Image
              src="/mocha bliss.png"
              alt="Mocha Bliss 2"
              fill
              className="object-contain"
            />
          </div>

          {/* 6. Bottom Right (Matcha 2) */}
          <div
            data-speed="1.5"
            className="parallax-can absolute bottom-[12%] right-[16%] lg:right-[20%] w-[90px] md:w-[130px] lg:w-[170px] aspect-[1/2] drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] rotate-[12deg] z-0"
          >
            <Image
              src="/matcha latte.png"
              alt="Matcha Latte 2"
              fill
              className="object-contain"
            />
          </div>

          {/* 7. Top Center Left (Pink Latte 2) */}
          <div
            data-speed="0.7"
            className="parallax-can absolute top-[4%] left-[28%] lg:left-[30%] w-[70px] md:w-[100px] lg:w-[130px] aspect-[1/2] drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)] -rotate-[22deg] z-0 hidden md:block"
          >
            <Image
              src="/pink lattee.png"
              alt="Pink Latte 2"
              fill
              className="object-contain"
            />
          </div>

          {/* 8. Bottom Center Right (Vanilla 2) */}
          <div
            data-speed="0.9"
            className="parallax-can absolute bottom-[6%] right-[28%] lg:right-[32%] w-[80px] md:w-[110px] lg:w-[150px] aspect-[1/2] drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] rotate-[18deg] z-0 hidden sm:block"
          >
            <Image
              src="/venilla .png"
              alt="Vanilla Bean 2"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* --- History Section Zoom Portal (Foreground layer) --- */}
        <div
          ref={historyWrapperRef}
          className="absolute inset-0 w-full h-full z-50 overflow-hidden origin-center"
          style={{ transformOrigin: "center center" }}
        >
          <HistorySection ref={historySectionRef} />
        </div>
      </div>
    </div>

      {/* --- Conclusion Section (Normal Scroll) --- */}
      <section className="w-full h-screen bg-[#F3ECD6] relative flex flex-col justify-start pt-24 px-6 md:px-16 lg:px-24 overflow-hidden pointer-events-none">
        <div className="max-w-[1200px] z-10 w-full">
          <TextAnimation>
            <h2 className="font-fedro text-[10vw] sm:text-[7.5vw] md:text-[5vw] lg:text-[4.5vw] leading-[0.95] text-[#111] uppercase font-black tracking-tight">
              DISCOVER THE DELICATE<br />
              BALANCE OF TEXTURES AND<br />
              FLAVORS THAT MADE THE<br />
              WORLD FALL IN LOVE
            </h2>
          </TextAnimation>
        </div>

        {/* Decorative Image at bottom right */}
        <div className="absolute bottom-0 right-0 w-[60vw] md:w-[40vw] lg:w-[35vw] max-w-[500px] aspect-square z-0 pointer-events-auto">
          <Image
            src="/mocha bliss.png"
            alt="Delicious coffee can"
            fill
            className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.3)] -rotate-[10deg]"
          />
          {/* Sparks SVG */}
          <div className="absolute top-[20%] left-[5%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] text-[#A23838] -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
              <line x1="30" y1="70" x2="10" y2="55" />
              <line x1="40" y1="50" x2="30" y2="25" />
              <line x1="60" y1="50" x2="80" y2="40" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}

export default EvolutionSection;
