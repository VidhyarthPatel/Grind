"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import TextAnimation from "@/components/textAnimation";

function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Initial setup for the custom cursor
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
      });
    }
  }, []);

  useEffect(() => {
    // If playing, we need the YouTube API to detect pauses
    if (isPlaying) {
      const initPlayer = () => {
        if (window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player("yt-player", {
            events: {
              onStateChange: (event) => {
                // 2 is PAUSED, 0 is ENDED
                if (event.data === 2 || event.data === 0) {
                  setIsPlaying(false);
                }
              },
            },
          });
        }
      };

      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.head.appendChild(tag);
        }
        window.onYouTubeIframeAPIReady = initPlayer;
      } else {
        initPlayer();
      }
    } else {
      // Clean up player reference when not playing
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    }
  }, [isPlaying]);

  const handleMouseEnter = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "easeInOut",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "easeInOut",
      });
    }
  };

  const handleMouseMove = (e) => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.5,
        ease: "easeInOut",
      });
    }
  };

  return (
    <section className="w-full pt-20 flex flex-col justify-center px-6 md:px-12 lg:px-16 pb-16 relative">
      <div className="flex flex-col md:flex-row items-start justify-between">
        {/* Left Column: Heading */}
        <div className="flex-shrink-0">
          <TextAnimation animateOnScroll={false}>
            <h1 className="font-fedro text-[5.5rem] sm:text-[7rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-bold leading-[0.85] tracking-tight text-[#4E3629]">
              More Then
              <br />
              Coffee.
            </h1>
          </TextAnimation>
        </div>

        {/* Right Column: Description & Link */}
        <div className="flex flex-col mt-6 md:mt-1 md:pt-1">
          <TextAnimation animateOnScroll={false} delay={0.4}>
            <p className="font-sans text-[14px] md:text-[14px] lg:text-[15px] font-medium text-[#111] uppercase leading-[1.5] mb-6 max-w-[300px]">
              EXPERIENCE REFINE  FLAVORS, COZY
              MOMENTS, AND THE ESSENCE OF MORDERN
              CAFE CULTURE
            </p>
          </TextAnimation>
          <TextAnimation animateOnScroll={false} delay={0.6}>
            <div>
              <a
                href="#shop"
                className="font-fedro text-[18px] md:text-[20px] font-bold text-[#111] underline decoration-[1.5px] underline-offset-[5px] hover:text-[#4E3629] transition-colors inline-flex items-center"
              >
                shop now <span className="text-[18px] font-normal ml-1">↗</span>
              </a>
            </div>
          </TextAnimation>
        </div>
      </div>

      {/* Hero Image / Video Toggle */}
      <div className="w-full mt-6 md:mt-8">
        {!isPlaying ? (
          <div
            className="relative cursor-none rounded-2xl overflow-hidden"
            onClick={() => setIsPlaying(true)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <Image
              src="/Hero1.png"
              alt="Woman drinking WAQA coffee"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto object-cover pointer-events-none"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            <iframe
              id="yt-player"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Sxc-jclyq-k?si=TcAZVkaBkp0jwzio&controls=0&autoplay=1&enablejsapi=1&rel=0&iv_load_policy=3&cc_load_policy=0&modestbranding=1&disablekb=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full absolute inset-0 pointer-events-none"
            ></iframe>

            {/* Transparent overlay intercepts all clicks to block YouTube UI interactions */}
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={() => {
                if (
                  playerRef.current &&
                  typeof playerRef.current.pauseVideo === "function"
                ) {
                  playerRef.current.pauseVideo();
                } else {
                  setIsPlaying(false);
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Custom Follower Cursor */}
      {!isPlaying && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center justify-center w-24 h-24 bg-[#4E3629] rounded-full shadow-xl"
        >
          <span className="font-sans font-bold tracking-[0.15em] text-[#F3ECD6] text-[13px] uppercase whitespace-nowrap pl-1">
            Play
          </span>
        </div>
      )}
    </section>
  );
}

export default Hero;
