import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PILLARS } from "@/data";
import { COLORS, FONTS, FONT_SIZE } from "@/config/theme";

gsap.registerPlugin(ScrollTrigger);

const SLIDE_BG = [
  "#a01628",
  "#c91d34",
  "#F62440",
] as const;

/*
  How much of each buried card peeks out on the LEFT once it's covered
  by the next one. Needs to be wide enough to clear the section's side
  padding + the big number, so "01" / "02" stay legible in the sliver.
*/
const PEEK = 72; /* px — narrow enough on mobile to keep card 3 readable */

type Pillar = (typeof PILLARS)[number];

function Slide({ pillar, index, cardRef }: { pillar: Pillar; index: number; cardRef: (el: HTMLElement | null) => void }) {
  return (
    <article
      ref={cardRef}
      className="absolute inset-0 flex flex-col justify-between overflow-hidden"
      style={{
        background: SLIDE_BG[index] ?? SLIDE_BG[0],
        padding: "clamp(0.75rem,4vw,4rem)",
        zIndex: index + 1,
        borderRadius: "0 12px 12px 0",
        willChange: "transform",
      }}
    >
      {/* top bar */}
      <div className="flex items-start justify-between label-mono" style={{ color: COLORS.textMuted, fontSize: "clamp(0.5rem,1.8vw,0.7rem)" }}>
        <span>{pillar.kicker}</span>
        <span>{index + 1} / {PILLARS.length}</span>
      </div>

      {/* body */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-24">
        <div className="shrink-0">
          <div className="text-display leading-none select-none" style={{ fontSize: "clamp(5rem,18vw,18rem)", color: COLORS.border }}>
            {pillar.n}
          </div>
          <h3 className="text-display uppercase" style={{ fontSize: "clamp(1.2rem,3.5vw,5rem)", color: COLORS.textPrimary, marginTop: "0.1em" }}>
            {pillar.title}
          </h3>
        </div>

        <div className="w-full md:w-[38%] flex flex-col gap-3 md:gap-6">
          <p style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)", lineHeight: 1.75, color: COLORS.textSecondary }}>
            {pillar.blurb}
          </p>
          {pillar.bullets.map((b) => (
            <div key={b.name}>
              <div className="label-mono mb-1" style={{ color: COLORS.textMuted, fontSize: "clamp(0.5rem,1.5vw,0.7rem)" }}>{b.layer} — {b.name}</div>
              <p style={{ fontFamily: FONTS.display, fontWeight: 300, fontSize: "clamp(0.85rem, 1.3vw, 1rem)", lineHeight: 1.7, color: COLORS.textSecondary }}>
                {b.sub}. {b.items.join(". ")}.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* bottom border */}
      <div style={{ height: 1, background: COLORS.border }} />
    </article>
  );
}

export function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = PILLARS.length; // 3

      /*
        Card 0: sits at x=0, never moves. It's the base of the stack.
        Card i (i >= 1): slides in from x=100vw and settles at x=i*PEEK.

        Because each card is offset by one more PEEK than the one below it,
        every earlier card keeps a PEEK-wide sliver visible on its LEFT edge
        once it's buried. End state, left to right: "01" sliver, "02" sliver,
        then card 3 filling the rest of the screen.
      */
      const finalX = (cardIndex: number) => cardIndex * PEEK;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(total - 1) * window.innerWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < total; i++) {
        tl.fromTo(
          cardRefs.current[i],
          { x: "100vw" },
          { x: () => finalX(i), ease: "none" },
          (i - 1) * 0.5
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden" style={{ background: SLIDE_BG[0] }}>
      {PILLARS.map((p, i) => (
        <Slide
          key={p.n}
          pillar={p}
          index={i}
          cardRef={(el) => { cardRefs.current[i] = el; }}
        />
      ))}
    </section>
  );
}