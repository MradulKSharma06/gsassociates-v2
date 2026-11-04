import { HeroCarousel } from "@/components/home/HeroCarousel";
import { StatsRow } from "@/components/home/StatsRow";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ClientStrip } from "@/components/home/ClientStrip";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <StatsRow />
      <AboutSnippet />
      <FeaturedProjects />
      <FeaturedServices />
      <ClientStrip />
      <CtaBanner />
    </>
  );
}
