import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80", rot: -3 },
  { img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80", rot: 2 },
  { img: "/images/visual-playground.jpeg", rot: -2 },
  { img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80", rot: 3 },
  { img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=600&q=80", rot: -1 },
  { img: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&q=80", rot: 2 },
];

export function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: contentRef.current,
          pinSpacing: false,
        });
      }
      if (leftColRef.current) {
        gsap.to(leftColRef.current, {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
      if (rightColRef.current) {
        gsap.to(rightColRef.current, {
          y: -400,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const left = ITEMS.filter((_, i) => i % 2 === 0);
  const right = ITEMS.filter((_, i) => i % 2 === 1);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      <div
        ref={contentRef}
        className="h-screen flex items-center justify-center z-10 relative px-6"
      >
        <div className="text-center max-w-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl text-text-primary mb-6">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="text-sm md:text-base text-muted mb-8 max-w-md mx-auto">
            Side projects, experiments, and moments worth keeping.
          </p>
          {/* <a
            href="#"
            className="group relative inline-flex rounded-full text-sm"
          >
            <span className="absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-text-primary px-5 py-2.5 group-hover:border-transparent">
              See on Dribbble <span className="text-[10px]">↗</span>
            </span>
          </a> */}
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full px-6 md:px-10 grid grid-cols-2 gap-12 md:gap-40">
          <div ref={leftColRef} className="flex flex-col gap-12 md:gap-24 pt-[20vh]">
            {left.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it.img)}
                style={{ transform: `rotate(${it.rot}deg)` }}
                className="pointer-events-auto aspect-square max-w-[320px] w-full bg-surface border border-stroke rounded-2xl overflow-hidden hover:scale-105 transition-transform"
              >
                <img src={it.img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div ref={rightColRef} className="flex flex-col gap-12 md:gap-24 pt-[60vh] items-end">
            {right.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it.img)}
                style={{ transform: `rotate(${it.rot}deg)` }}
                className="pointer-events-auto aspect-square max-w-[320px] w-full bg-surface border border-stroke rounded-2xl overflow-hidden hover:scale-105 transition-transform"
              >
                <img src={it.img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-lg flex items-center justify-center p-6 cursor-zoom-out"
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full rounded-2xl border border-stroke"
          />
        </div>
      )}
    </section>
  );
}
