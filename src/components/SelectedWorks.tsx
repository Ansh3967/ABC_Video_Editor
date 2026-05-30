import { SectionHeader } from "./SectionHeader";

const PROJECTS = [
  {
    title: "Automotive Motion",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
  },
  {
    title: "Urban Architecture",
    span: "md:col-span-5",
    aspect: "aspect-[16/10]",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
  },
  {
    title: "Human Perspective",
    span: "md:col-span-5",
    aspect: "aspect-[16/10]",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=80",
  },
  {
    title: "Brand Identity",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
    img: "images/Brand Identity.jpeg",
  },
];

export function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured"
          italic="projects"
          subtitle="A selection of projects I've worked on, from concept to launch."
          // cta="View all work"
        />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p) => (
            <a
              href="#"
              key={p.title}
              className={`group relative overflow-hidden bg-surface border border-stroke rounded-3xl ${p.span} ${p.aspect}`}
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              {/* <div className="absolute inset-0 bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="relative rounded-full p-[2px] accent-gradient-animated">
                  <div className="bg-white text-bg rounded-full px-5 py-2 text-sm">
                    View — <span className="font-display italic">{p.title}</span>
                  </div>
                </div>
              </div> */}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
