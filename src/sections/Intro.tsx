import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSON } from "@/data";
import { COLORS, FONTS, FONT_SIZE } from "@/config/theme";

gsap.registerPlugin(ScrollTrigger);

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef   = useRef<HTMLSpanElement[]>([]);
  const lineRef    = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const bgNumRef   = useRef<HTMLDivElement>(null);

  const words = PERSON.introParagraph.split(" ");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /* ---------- entrance reveal (plays once, normal scroll) ---------- */
      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      entrance
        .from(labelRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        })
        .from(
          headingRef.current,
          {
            y: 60,
            opacity: 0,
            skewY: 3,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          bodyRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );

      /* subtle background number parallax on entry */
      gsap.fromTo(
        bgNumRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      /* ---------- pinned scrub sequence ---------- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* background number drifts + scales as you scroll through */
      tl.to(bgNumRef.current, {
        yPercent: -15,
        scale: 1.08,
        ease: "none",
      }, 0);

      /* line stretches, thicker + glow dot rides the tip */
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none" },
        0
      );

      tl.fromTo(
        dotRef.current,
        { left: "0%", opacity: 0 },
        {
          left: "100%",
          opacity: 1,
          ease: "none",
          duration: 1,
        },
        0
      );

      /* word colour fill, with blur + scale settle for texture */
      words.forEach((_, i) => {
        tl.to(
          wordsRef.current[i],
          {
            color: COLORS.creamDeep,
            filter: "blur(0px)",
            scale: 1,
            ease: "none",
          },
          i * 0.08
        );
      });

      /* faint heading drift for parallax depth against pinned words */
      tl.to(headingRef.current, {
        yPercent: -8,
        opacity: 0.85,
        ease: "none",
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: COLORS.pageBg }}>

      {/* decorative parallax background numeral */}
      <div
        ref={bgNumRef}
        aria-hidden
        style={{
          position: "absolute",
          right: "-2vw",
          top: "-8vh",
          fontFamily: FONTS.display,
          fontWeight: 900,
          fontSize: "42vw",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `1px ${COLORS.borderStrong}`,
          opacity: 0.06,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        01
      </div>

      <div className="h-screen flex flex-col justify-center px-6 md:px-12 gap-8 md:gap-12 relative">

        {/* header */}
        <div>
          <div ref={labelRef} className="label-mono mb-3" style={{ color: COLORS.textMuted }}>
            {PERSON.title}
          </div>

          <h2
            ref={headingRef}
            style={{
              fontFamily: FONTS.display,
              fontWeight: 900,
              fontSize: FONT_SIZE.sectionHead,
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
              textTransform: "uppercase",
              color: COLORS.textPrimary,
            }}
          >
            {PERSON.introSubheader}
          </h2>

          {/* thicker line with gradient + traveling glow dot */}
          <div style={{ marginTop: "1rem", overflow: "hidden", position: "relative" }}>
            <div
              ref={lineRef}
              style={{
                height: "3px",
                background: `linear-gradient(90deg, ${COLORS.borderStrong}, ${COLORS.creamDeep})`,
                transformOrigin: "left center",
                transform: "scaleX(0)",
                borderRadius: "2px",
              }}
            />
            <div
              ref={dotRef}
              style={{
                position: "absolute",
                top: "50%",
                width: "10px",
                height: "10px",
                marginLeft: "-5px",
                borderRadius: "50%",
                background: COLORS.creamDeep,
                boxShadow: `0 0 12px 3px ${COLORS.creamDeep}`,
                transform: "translateY(-50%)",
                opacity: 0,
              }}
            />
          </div>

          <p
            ref={bodyRef}
            className="mt-4 leading-relaxed"
            style={{ fontFamily: FONTS.sans, fontSize: FONT_SIZE.small, color: COLORS.creamDeep }}
          >
            {PERSON.introBody}
          </p>
        </div>

        {/* word-fill paragraph */}
        <p style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: "clamp(1.3rem, 4vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => { if (el) wordsRef.current[i] = el; }}
              className="inline-block mr-[0.25em]"
              style={{
                color: "rgba(255,235,191,0.2)",
                filter: "blur(3px)",
                display: "inline-block",
                transform: "scale(0.94)",
              }}
            >
              {w}
            </span>
          ))}
        </p>

      </div>
    </section>
  );
}