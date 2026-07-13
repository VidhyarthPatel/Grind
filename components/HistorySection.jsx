"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

const ERAS = [
  {
    year: 1880,
    title: "The arrival",
    text: "Originally brought to the city as a luxury reserved for the elite, known simply as Western Coffee. Over time, we made it our own, blending robust flavors into a modern revolution.",
    image: "/1880 coffee shop.png",
    alt: "1880 Coffee Shop",
  },
  {
    year: 1909,
    title: "The awakening",
    text: "As the new century dawned, coffeehouses became the beating heart of culture and conversation. What was once a foreign indulgence had transformed into a daily ritual, fueling artists, thinkers, and the city itself.",
    image: "/1909 coffee shop.png",
    alt: "1909 Coffee Shop",
  },
  {
    year: 1958,
    title: "The golden age",
    text: "Espresso machines roared to life behind marble counters. The coffeehouse was no longer just a place to drink — it was where deals were struck, poetry was born, and a generation found its voice over tiny porcelain cups.",
    image: "/1958 coffee shop.png",
    alt: "1958 Coffee Shop",
  },
  {
    year: 1991,
    title: "The new wave",
    text: "Single-origin beans. Artisan roasting. A quiet rebellion against the ordinary. Coffee lovers began demanding more — traceability, craftsmanship, and flavors that told a story from farm to cup.",
    image: "/1991 coffee shop.png",
    alt: "1991 Coffee Shop",
  },
  {
    year: 2016,
    title: "The modern grind",
    text: "Pour-over precision meets bold experimentation. Coffee is no longer just a beverage — it's a craft, a culture, a daily ritual perfected. Welcome to the era of Grind.",
    image: "/2016 coffee shop.jpeg",
    alt: "2016 Coffee Shop",
  },
];

const HistorySection = forwardRef(function HistorySection(props, ref) {
  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-[#C89E78] flex flex-col md:flex-row relative z-10"
    >
      {/* Left Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-16">
        <div className="max-w-full relative">
          {ERAS.map((era, i) => (
            <div
              key={era.year}
              data-history-era={i}
              className={i === 0 ? "relative" : "absolute inset-0 w-full"}
              style={i === 0 ? undefined : { opacity: 0 }}
            >
              <h2 className="font-fedro text-3xl md:text-[6vw] text-[#111] font-black tracking-tight mb-4 uppercase">
                {era.title}
              </h2>
              <p className="font-sans text-[14px] md:text-[16px] text-[#111] font-medium leading-relaxed opacity-90">
                {era.text}
              </p>
            </div>
          ))}
        </div>

        {/* Huge Year Number — Digit Roller */}
        <div className="mt-32 md:mt-0 flex items-end">
          <div className="font-fedro text-[28vw] md:text-[20vw] leading-[0.75] text-[#F3ECD6] tracking-tighter font-semibold flex">
            {[0, 1, 2, 3].map((pos) => (
              <div
                key={pos}
                className="overflow-hidden relative"
                style={{ height: "0.78em" }}
              >
                <div
                  data-history-digit={pos}
                  className="will-change-transform"
                >
                  {ERAS.map((era, i) => (
                    <div
                      key={i}
                      className="flex items-end justify-center"
                      style={{ height: "0.78em" }}
                    >
                      {String(era.year)[pos]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8 flex items-stretch">
        <div className="relative w-full min-h-[60vh] md:min-h-[calc(100vh-3rem)] border-[12px] border-[#F3ECD6] shadow-xl overflow-hidden bg-[#F3ECD6]">
          {ERAS.map((era, i) => (
            <div
              key={era.year}
              data-history-image={i}
              className="absolute inset-0"
              style={i === 0 ? undefined : { opacity: 0 }}
            >
              <Image
                src={era.image}
                alt={era.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export { ERAS };
export default HistorySection;
