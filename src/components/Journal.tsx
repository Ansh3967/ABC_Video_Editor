import { SectionHeader } from "./SectionHeader";

const ENTRIES = [
  {
    title: "On craft and patience",
    img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80",
    read: "4 min read",
    date: "Mar 12, 2026",
  },
  {
    title: "Designing with restraint",
    img: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400&q=80",
    read: "6 min read",
    date: "Feb 28, 2026",
  },
  {
    title: "Motion as meaning",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
    read: "3 min read",
    date: "Feb 04, 2026",
  },
  {
    title: "Systems that breathe",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    read: "5 min read",
    date: "Jan 20, 2026",
  },
];

export function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          title="Recent"
          italic="thoughts"
          subtitle="Notes on design, code, and the spaces in between."
          // cta="View all"
        />
        <div className="flex flex-col gap-4">
          {ENTRIES.map((e) => (
            <a
              href="#"
              key={e.title}
              className="group flex items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors"
            >
              <img
                src={e.img}
                alt=""
                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg text-text-primary truncate">{e.title}</h3>
                <div className="text-xs text-muted">{e.read}</div>
              </div>
              <div className="text-xs text-muted whitespace-nowrap hidden sm:block">{e.date}</div>
              <span className="text-text-primary text-xl pr-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
