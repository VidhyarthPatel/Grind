"use client";

import React from "react";
import HoverStagger from "./HoverStagger";

function Nav() {
  return (
    <header className="w-full pt-6 pb-2 px-6 md:px-12 lg:px-16">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="shrink-0">
          <a
            href="/"
            className="font-fedro text-[2.5rem] leading-none font-bold tracking-tight text-[#4E3629]"
          >
            <HoverStagger stagger={0.02} duration={0.35}>
              Grind
            </HoverStagger>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-12">
          {[
            { name: "Coffee Drink", href: "#coffee" },
            { name: "Products", href: "#products" },
            { name: "Location", href: "#location" },
            { name: "About", href: "#about" },
            { name: "Events", href: "#events" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-fedro text-[15px] font-medium text-[#4E3629]"
            >
              <HoverStagger>{link.name}</HoverStagger>
            </a>
          ))}
        </nav>

        {/* Call to Action Button */}
        <div>
          <a
            href="#book"
            className="inline-flex items-center justify-center bg-[#4E3629] px-6 py-2 rounded-md font-fedro text-[14px] font-medium text-[#F3ECD6] hover:bg-[#3E291F] transition-colors"
          >
            <HoverStagger stagger={0.02} duration={0.3}>
              Book A Table
            </HoverStagger>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Nav;
