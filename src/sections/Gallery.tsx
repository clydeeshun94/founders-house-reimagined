import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_ITEMS, MARQUEE_WORDS } from "@/data";
import { COLORS, FONTS } from "@/config/theme";

gsap.registerPlugin(ScrollTrigger);

const CARD_W = "min(96vw, 720px)";
const CARD_H = "373px";

/* ─── Shared Card ─────────────────────────────────────────────────────────── */

function Card({ item }: { item: (typeof GALLERY_ITEMS)[number] }) {
  return (
    <div style={{ width: CARD_W, height: CARD_H, borderRadius: 0, overflow: "hidden", position: "relative", boxShadow: "0 16px 48px rgba(0,0,0,0.12)", flexShrink: 0 }}>
      <img src={item.src} alt={item.title} loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 65%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#F62440", marginBottom: "1rem", textAlign: "center" }}>
          {item.tag}
        </div>
        <div style={{ fontFamily: FONTS.display, fontWeight: 1000, fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-0.005em", lineHeight: 0.95, textTransform: "uppercase", color: "#FFE5BF", textAlign: "center" }}>
          {item.title}
        </div>
      </div>
    </div>
  );
}

/* ─── GalleryNormal — full 3-D animation for Chrome / Firefox ─────────────── */

function GalleryNormal() {
  const sectionRef   = useRef<HTMLElement>(null);
  const marqueeWrap  = useRef<HTMLDivElement>(null);
  const marqueeTrack = useRef<HTMLDivElement>(null);
  const wrapRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const amp = Math.min(window.innerWidth * 0.12, 120);
      wrapRefs.current.forEach((el, i) => {
        if (!el) return;
        const base = Math.sin(i * 0.45) * amp;
        gsap.set(el, { x: base });
        gsap.fromTo(el,
          { x: base + (i % 2 === 0 ? -40 : 40), y: 60, autoAlpha: 0 },
          {
            x: base, y: 0, autoAlpha: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top bottom-=10%", end: "top center", scrub: 0.6 },
          }
        );
      });

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rx = gsap.utils.random(45, 80);
        const ry = gsap.utils.random(-14, 14);
        const rz = gsap.utils.random(-10, 10);
        const setZ     = gsap.quickSetter(card, "z", "px");
        const setScale = gsap.quickSetter(card, "scale");

        gsap.fromTo(card,
          { rotationX: rx, rotationY: ry, rotationZ: rz, scale: 0.92 },
          {
            rotationX: -rx, rotationY: -ry, rotationZ: -rz, scale: 0.92,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom+=15%",
              end: "bottom top-=15%",
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const wave = Math.sin(self.progress * Math.PI);
                setZ(wave * -60);
                setScale(0.92 + wave * 0.08);
              },
            },
          }
        );
      });

      if (marqueeTrack.current && marqueeWrap.current) {
        const wrap = marqueeWrap.current;
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            onToggle: (self) => {
              gsap.to(wrap, { opacity: self.isActive ? 1 : 0, duration: 0.4, overwrite: true });
            },
          },
        }).fromTo(marqueeTrack.current, { x: "100vw" }, { x: "-100%", ease: "none" });
      }

      let t: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(t);
        t = setTimeout(() => {
          const a = Math.min(window.innerWidth * 0.12, 120);
          wrapRefs.current.forEach((el, i) => { if (el) gsap.set(el, { x: Math.sin(i * 0.45) * a }); });
          ScrollTrigger.refresh();
        }, 150);
      };
      window.addEventListener("resize", onResize);
      return () => { clearTimeout(t); window.removeEventListener("resize", onResize); };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[15vh] md:py-[20vh] flex flex-col items-center overflow-clip"
      style={{ background: COLORS.pageBg }}>

      <div ref={marqueeWrap} aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 z-10 overflow-hidden"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0 }}>
        <div ref={marqueeTrack} className="flex gap-8 md:gap-12 w-max will-change-transform">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span key={i} className="whitespace-nowrap uppercase leading-none"
              style={{
                fontSize: "clamp(1.5rem,7vw,5rem)",
                fontFamily: FONTS.display,
                fontWeight: 1000,
                letterSpacing: "-0.03em",
                backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}>
              {word} /
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center w-full" style={{ paddingBottom: "8vh" }}>
        {GALLERY_ITEMS.slice(0, 5).map((item, i) => (
          <div key={i}
            ref={(el) => { wrapRefs.current[i] = el; }}
            style={{ perspective: 900, marginBottom: "2rem", width: CARD_W }}>
            <div ref={(el) => { cardRefs.current[i] = el; }}
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
              <Card item={item} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── GallerySafari — WebKit-safe version ─────────────────────────────────── */

function GallerySafari() {
  const sectionRef   = useRef<HTMLElement>(null);
  const marqueeWrap  = useRef<HTMLDivElement>(null);
  const marqueeTrack = useRef<HTMLDivElement>(null);
  const wrapRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const amp = Math.min(window.innerWidth * 0.12, 120);

      wrapRefs.current.forEach((el, i) => {
        if (!el) return;
        const base = Math.sin(i * 0.45) * amp;
        gsap.set(el, { x: base });
        gsap.fromTo(el,
          { x: base + (i % 2 === 0 ? -40 : 40), y: 60, opacity: 0 },
          {
            x: base, y: 0, opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top bottom-=10%", end: "top center", scrub: 0.6 },
          }
        );
      });

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rz = gsap.utils.random(-8, 8);
        gsap.fromTo(card,
          { rotation: rz, scale: 0.92 },
          {
            rotation: -rz, scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom+=15%",
              end: "bottom top-=15%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      if (marqueeTrack.current && marqueeWrap.current) {
        const wrap = marqueeWrap.current;
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            onToggle: (self) => {
              gsap.to(wrap, { opacity: self.isActive ? 1 : 0, duration: 0.4, overwrite: true });
            },
          },
        }).fromTo(marqueeTrack.current, { x: () => window.innerWidth }, { x: "-100%", ease: "none" });
      }

      let t: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(t);
        t = setTimeout(() => {
          const a = Math.min(window.innerWidth * 0.12, 120);
          wrapRefs.current.forEach((el, i) => { if (el) gsap.set(el, { x: Math.sin(i * 0.45) * a }); });
          ScrollTrigger.refresh();
        }, 150);
      };
      window.addEventListener("resize", onResize);
      return () => { clearTimeout(t); window.removeEventListener("resize", onResize); };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={marqueeWrap} aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 z-10 overflow-hidden"
        style={{ top: "50%", transform: "translateY(-50%)", WebkitTransform: "translateY(-50%)", opacity: 0 }}>
        <div ref={marqueeTrack} className="flex gap-8 md:gap-12 w-max">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span key={i} className="whitespace-nowrap uppercase leading-none"
              style={{
                fontSize: "clamp(1.5rem,7vw,5rem)",
                fontFamily: FONTS.display,
                fontWeight: 1000,
                letterSpacing: "-0.03em",
                backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}>
              {word} /
            </span>
          ))}
        </div>
      </div>

      <section ref={sectionRef} className="relative py-[15vh] md:py-[20vh] flex flex-col items-center overflow-hidden"
        style={{ background: COLORS.pageBg }}>
        <div className="flex flex-col items-center w-full" style={{ paddingBottom: "8vh" }}>
          {GALLERY_ITEMS.slice(0, 5).map((item, i) => (
            <div key={i}
              ref={(el) => { wrapRefs.current[i] = el; }}
              style={{ marginBottom: "2rem", width: CARD_W }}>
              <div ref={(el) => { cardRefs.current[i] = el; }}>
                <Card item={item} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ─── Export — serve based on browser ────────────────────────────────────── */

export function Gallery() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return isSafari ? <GallerySafari /> : <GalleryNormal />;
}
