import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HlsVideo } from "./HlsVideo";

const ROLES = ["Creater", "Photographer", "Editor", "Founder"];
const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      );
      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        "-=0.9",
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <HlsVideo src={HLS_SRC} />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COLLECTION '26
        </div>
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Joseph Cristian
        </h1>
        <p className="blur-in text-lg md:text-2xl text-text-primary/90 mb-6">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          lives in TamilNadu.
        </p>
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Designing seamless digital interactions by focusing on the unique nuances which bring
          systems to life.
        </p>
        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <a
            href="#work"
            className="group relative rounded-full text-sm transition-transform hover:scale-105"
          >
            <span className="absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative block rounded-full bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary px-7 py-3.5 transition-colors">
              See Works
            </span>
          </a>
          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative rounded-full text-sm transition-transform hover:scale-105"
          >
            <span className="absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative block rounded-full border-2 border-stroke group-hover:border-transparent bg-bg text-text-primary px-7 py-3.5">
              Reach out...
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
