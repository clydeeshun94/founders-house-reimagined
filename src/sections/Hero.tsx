import { PERSON } from "@/data";
import { COLORS, FONTS } from "@/config/theme";

/* Background image that shows through the cutout letters */
const BG_IMAGE = "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80')";

const cutoutStyle: React.CSSProperties = {
  fontFamily: FONTS.display,
  fontWeight: 900,
  fontSize: "clamp(3.5rem, 18vw, 18rem)",
  lineHeight: 0.88,
  letterSpacing: "-0.04em",
  backgroundImage: BG_IMAGE,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  userSelect: "none",
};

export function Hero() {
  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{ background: COLORS.pageBg }}
    >
      {/* nav */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-8 md:px-12 md:py-10 z-10">
        <span className="label-mono" style={{ color: COLORS.textMuted }}>{PERSON.nameShort}</span>
        <nav className="flex items-center gap-6 label-mono" style={{ color: COLORS.textMuted }}>
          <a href={PERSON.links.linkedin} target="_blank" rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity" style={{ color: COLORS.textMuted }}>LinkedIn</a>
          <a href={`mailto:${PERSON.links.email}`}
            className="rounded-full px-4 py-1.5 transition-colors"
            style={{ border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = COLORS.accent; el.style.color = COLORS.textInverse; el.style.borderColor = COLORS.accent; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = COLORS.textPrimary; el.style.borderColor = COLORS.border; }}>
            Contact
          </a>
        </nav>
      </div>

      {/* FELIX — top-left */}
      <div className="absolute" style={{ top: "12%", left: "2vw" }}>
        <div style={cutoutStyle}>{PERSON.firstName}</div>
      </div>

      {/* DAVIS — bottom-right */}
      <div className="absolute" style={{ bottom: "14%", right: "2vw" }}>
        <div style={cutoutStyle}>{PERSON.lastName}</div>
      </div>

      {/* bottom bar */}
      <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-6 py-6 md:px-12 md:py-10 label-mono z-10"
        style={{ color: COLORS.textMuted, fontSize: "clamp(0.55rem, 1.8vw, 0.7rem)" }}>
        <span>{PERSON.title}</span>
        <span className="hidden md:block">↓ Scroll</span>
        <span>{PERSON.company}</span>
      </div>
    </section>
  );
}
