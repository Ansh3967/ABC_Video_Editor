import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SelectedWorks } from "@/components/SelectedWorks";
import { Journal } from "@/components/Journal";
import { Explorations } from "@/components/Explorations";
import { Stats } from "@/components/Stats";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Michael Smith — Creative Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Michael Smith — designing seamless digital interactions where systems come to life.",
      },
      { property: "og:title", content: "Michael Smith — Creative Portfolio" },
      {
        property: "og:description",
        content: "Selected works, journal, and explorations from Chicago.",
      },
    ],
  }),
});

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <main className="bg-bg text-text-primary font-body">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <Hero />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
