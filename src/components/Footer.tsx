import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HlsVideo } from "./HlsVideo";

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const SOCIALS = ["Twitter", "LinkedIn", "Dribbble"];

export function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 5,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      <div className="absolute inset-0">
        <HlsVideo src={HLS_SRC} flipped />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden mb-16">
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="text-6xl md:text-8xl font-display italic text-text-primary/90 px-6"
              >
                BUILDING THE FUTURE •
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          {/* <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Let's work together</p> */}

          {/* <a
            href="mailto:hello@michaelsmith.com"
            className="group relative inline-flex rounded-full text-sm"
          >
            <span className="absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary px-7 py-3.5 transition-colors">
              hello@michaelsmith.com <span className="text-[10px]">↗</span>
            </span>
          </a> */}
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mt-20 pt-6 border-t border-stroke flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-muted hover:text-text-primary uppercase tracking-[0.2em] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted uppercase tracking-[0.2em]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
              <span className="relative rounded-full w-2 h-2 bg-green-400" />
            </span>
            Available for projects
          </div>
        </div>
      </div>
    </footer>
  );
}
