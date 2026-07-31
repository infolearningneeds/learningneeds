"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function VideoTextReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoHeight, setVideoHeight] = useState("100vh");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth, slower fade + scale animation
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.9], [1, 3.5, 5]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.95], [1, 1, 0]);

  // Dynamically calculate video height based on aspect ratio
  useEffect(() => {
    const updateHeight = () => {
      if (videoRef.current) {
        const { videoWidth, videoHeight } = videoRef.current;
        if (videoWidth && videoHeight) {
          const aspectRatio = videoHeight / videoWidth;
          const newHeight = window.innerWidth * aspectRatio;
          setVideoHeight(`${newHeight}px`);
        }
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", updateHeight);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", updateHeight);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: videoHeight }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-full w-full overflow-hidden flex items-center justify-center">
        {/* Background video */}
        <video
          ref={videoRef}
          src="/images/about/hello.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Animated Text - Now solid white */}
        <motion.h1
          style={{ scale, opacity: textOpacity }}
          className="relative z-10 text-[14vw] font-extrabold uppercase text-white tracking-tight drop-shadow-2xl"
        >
          Welcome
        </motion.h1>

        {/* Gradient overlay for better readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}