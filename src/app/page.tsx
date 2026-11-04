import { HeroCarousel } from "@/components/home/HeroCarousel";
import { StatsRow } from "@/components/home/StatsRow";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ClientStrip } from "@/components/home/ClientStrip";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <StatsRow />
      <ScrollReveal>
        <AboutSnippet />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturedServices />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturedProjects />
      </ScrollReveal>
      <ClientStrip />
      <CtaBanner />
    </>
  );
}