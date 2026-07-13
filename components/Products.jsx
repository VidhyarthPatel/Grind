"use client";
import React, { useRef } from "react";
import Image from "next/image";
import TextAnimation from "./textAnimation";

const products = [
  {
    id: 1,
    name: "Matcha",
    subName: "Latte",
    image: "/matcha latte.png",
    hoverColor: "#3F5627",
  },
  {
    id: 2,
    name: "Mocha",
    subName: "Bliss",
    image: "/mocha bliss.png",
    hoverColor: "#3D2418",
  },
  {
    id: 3,
    name: "Vanilla",
    subName: "Bean",
    image: "/venilla .png",
    hoverColor: "#D1B280",
  },
  {
    id: 4,
    name: "Pink",
    subName: "Latte",
    image: "/pink lattee.png",
    hoverColor: "#F18FAE",
  },
];

function Products() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#F3ECD6] py-20 px-6 md:px-12 lg:px-20 relative">
      <div className="w-full">
        {/* Header Section */}
        <div className="relative flex flex-col md:flex-row items-center justify-center w-full">
          <TextAnimation>
            <h2 className="font-fedro text-[2rem] sm:text-[2.5rem] md:text-[3rem] text-center text-[#302030] uppercase leading-[1.1] tracking-tight font-semibold">
              Drinks as delicious
              <br />
              as they are delightful
            </h2>
          </TextAnimation>

          {/* Navigation Arrows (Mobile/Tablet) */}
          <div className="lg:hidden flex space-x-6 mt-10 md:mt-12 justify-center w-full">
            <button 
              onClick={scrollLeft}
              className="w-14 h-14 rounded-full bg-[#F3ECD6] border-[2.5px] border-[#111] flex items-center justify-center text-[#111] shadow-[4px_4px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-14 h-14 rounded-full bg-[#F3ECD6] border-[2.5px] border-[#111] flex items-center justify-center text-[#111] shadow-[4px_4px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div ref={scrollRef} className="flex lg:grid lg:grid-cols-4 gap-x-6 lg:gap-x-8 pt-12 lg:pt-20 overflow-x-auto snap-x snap-mandatory pb-12 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center group w-[80vw] sm:w-[45vw] lg:w-auto shrink-0 snap-center">
              {/* Product Image */}
              <div className="w-[85%] sm:w-[90%] lg:w-full aspect-square mb-2 relative flex flex-col items-center justify-center cursor-pointer">
                {/* Hover Background Circle */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-[75%] aspect-square rounded-full opacity-0 scale-50 transition-all duration-500 ease-out group-hover:scale-120 group-hover:opacity-100 z-0"
                  style={{ backgroundColor: product.hoverColor }}
                ></div>

                {/* The Can Image */}
                <div className="relative w-full h-full z-10 transition-transform duration-500 ease-out group-hover:scale-[1.15] group-hover:-rotate-6 group-hover:-translate-y-4">
                  <Image
                    src={product.image}
                    alt={`${product.name} ${product.subName}`}
                    fill
                    className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[15px_30px_40px_rgba(0,0,0,0.25)] transition-all duration-500"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                </div>
              </div>

              {/* Product Info & Actions */}
              <h3 className="font-fedro text-[1.6rem] mt-5 md:text-[1.8rem] text-center text-[#302030] uppercase font-medium leading-[1.1] min-h-16">
                {product.name}
                <br />
                {product.subName}
              </h3>

              <div className="flex items-center space-x-3 mt-5">
                <button className="px-8 py-3 sm:px-10 sm:py-3.5 rounded-full border-[1.5px] border-[#302030] text-[#302030] font-sans font-bold text-[12px] sm:text-[14px] uppercase tracking-widest hover:bg-[#302030] hover:text-[#F3ECD6] transition-colors">
                  Quick Add
                </button>
                {/* <button className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] rounded-full border-[1.5px] border-[#302030] flex items-center justify-center text-[#302030] hover:bg-[#302030] hover:text-[#F3ECD6] transition-colors">
                  <span className="text-xl sm:text-2xl leading-none font-light">
                    ↗
                  </span>
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
