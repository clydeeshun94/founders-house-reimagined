import { Hero }         from "@/sections/Hero";
import { VideoSection } from "@/sections/VideoSection";
import { Intro }        from "@/sections/Intro";
import { Gallery }      from "@/sections/Gallery";
import { Pillars }      from "@/sections/Pillars";
import { Footer }       from "@/sections/Footer";

export function Page() {
  return (
    <main>
      <Hero />
      <VideoSection />
      <Intro />
      <Gallery />
      <Pillars />
      <Footer />
    </main>
  );
}
