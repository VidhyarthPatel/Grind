"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Marquee() {
  const marqueeRef = useRef(null);

  const words = ["EFFORTLESSLY STYLISH", "ALWAYS DELICIOUS", "JOYFULLY BOLD"];

  // Repeat enough to definitely cover ultra-wide screens
  const repeatedWords = [...words, ...words, ...words, ...words, ...words];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (marqueeRef.current) {
      const tween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });

      // Shift the playhead forward by 10,000 iterations to prevent it from hitting time 0 
      // when playing backwards (scrolling up). This makes it truly infinite in both directions.
      tween.totalTime(25 * 10000);

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          // Get scroll velocity and use it to modify the timeScale
          let velocity = self.getVelocity();
          
          // Calculate target speed (base speed 1 + scroll momentum)
          let targetTimeScale = 1 + (velocity / 500);
          
          // Clamp to prevent it from going blindingly fast
          targetTimeScale = Math.max(-3, Math.min(4, targetTimeScale));

          gsap.to(tween, {
            timeScale: targetTimeScale,
            duration: 0.2,
            overwrite: true,
            onComplete: () => {
              // When scrolling stops, smoothly return to base forward speed (1)
              gsap.to(tween, {
                timeScale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        },
      });
    }
  }, []);

  return (
    <div className="w-full bg-[#4E3629] border-y-[2px] border-[#111] py-4 md:py-5 overflow-hidden">
      <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
        <div className="flex flex-shrink-0 items-center">
          {repeatedWords.map((word, index) => (
            <div key={index} className="flex items-center">
              <span className="font-sans font-black text-[#F3ECD6] text-xl md:text-2xl tracking-widest px-8">
                {word}
              </span>
              <span className="text-[#F3ECD6] text-xl md:text-2xl">✳</span>
            </div>
          ))}
        </div>
        <div className="flex flex-shrink-0 items-center" aria-hidden="true">
          {repeatedWords.map((word, index) => (
            <div key={`dup-${index}`} className="flex items-center">
              <span className="font-sans font-black text-[#F3ECD6] text-xl md:text-2xl tracking-widest px-8">
                {word}
              </span>
              <span className="text-[#F3ECD6] text-xl md:text-2xl">✳</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marquee;
