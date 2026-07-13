"use client";

import React, { useRef, useCallback } from "react";
import gsap from "gsap";

/**
 * HoverStagger — Awwwards-style letter roll on hover.
 *
 * Each letter has its own overflow-hidden container with two copies
 * stacked vertically. On hover, each letter's inner wrapper slides
 * up with a stagger to reveal the bottom copy.
 */
export default function HoverStagger({
  children,
  className = "",
  as: Tag = "span",
  stagger = 0.025,
  duration = 0.5,
}) {
  const wrapperRef = useRef(null);
  const tweenRef = useRef(null);

  const text = typeof children === "string" ? children : "";

  const handleMouseEnter = useCallback(() => {
    if (tweenRef.current) tweenRef.current.kill();

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const letterInners = wrapper.querySelectorAll("[data-letter-inner]");

    tweenRef.current = gsap.to(letterInners, {
      yPercent: -50,
      stagger,
      duration,
      ease: "power3.inOut",
    });
  }, [stagger, duration]);

  const handleMouseLeave = useCallback(() => {
    if (tweenRef.current) tweenRef.current.kill();

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const letterInners = wrapper.querySelectorAll("[data-letter-inner]");

    tweenRef.current = gsap.to(letterInners, {
      yPercent: 0,
      stagger,
      duration,
      ease: "power3.inOut",
    });
  }, [stagger, duration]);

  return (
    <Tag
      ref={wrapperRef}
      className={`inline-flex cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((char, i) => {
        const isSpace = char === " ";
        const display = isSpace ? "\u00A0" : char;

        return (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ lineHeight: 1.2, height: "1.2em" }}
          >
            {/* Inner wrapper: two copies stacked. Slides up 50% to show bottom copy */}
            <span
              data-letter-inner
              className="inline-flex flex-col"
              style={{ height: "200%" }}
            >
              <span className="inline-block h-1/2 flex items-center">
                {display}
              </span>
              <span className="inline-block h-1/2 flex items-center" aria-hidden="true">
                {display}
              </span>
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
