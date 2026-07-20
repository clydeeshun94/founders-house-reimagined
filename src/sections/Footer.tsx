import { PERSON } from "@/data";
import { COLORS, FONTS, FONT_SIZE } from "@/config/theme";

const SOCIALS = [
  { label: "LinkedIn",   href: PERSON.links.linkedin  },
  { label: "X / Twitter",href: PERSON.links.x         },
  { label: "Instagram",  href: PERSON.links.instagram  },
  { label: "Reddit",     href: PERSON.links.reddit     },
  { label: "Substack",   href: PERSON.links.substack   },
] as const;

export function Footer() {
  return (
    <footer
      className="relative flex flex-col gap-6 px-6 py-6 md:px-12 md:py-8"
      style={{ background: COLORS.pageBg, borderTop: `1px solid ${COLORS.border}` }}
    >
      {/* name banner + links side by side */}
      <div className="flex flex-row items-end justify-between">
        {/* big name */}
        <div>
          <div className="text-display" style={{ fontSize: FONT_SIZE.heroName, color: COLORS.textPrimary, lineHeight: 0.88 }}>
            {PERSON.firstName}
          </div>
          <div className="text-display" style={{ fontSize: FONT_SIZE.heroName, color: COLORS.textMuted, lineHeight: 0.88 }}>
            {PERSON.lastName}.
          </div>
        </div>

        {/* links filling the right side */}
        <div className="flex flex-col justify-end gap-1 pb-1" style={{ color: COLORS.textSecondary }}>
          {SOCIALS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity text-right"
              style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.8rem)", letterSpacing: "-0.02em" }}>
              {label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* bottom row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p style={{ fontFamily: FONTS.sans, fontSize: FONT_SIZE.small, color: COLORS.textSecondary, lineHeight: 1.7, maxWidth: "32rem" }}>
          {PERSON.tagline} Building {PERSON.company} to make late-diagnosis deaths a thing of the past.
        </p>

        <a href={PERSON.links.whatsapp} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-between rounded-full px-6 py-4 transition-colors self-start md:self-auto"
          style={{ border: `1px solid ${COLORS.border}`, fontFamily: FONTS.display, fontWeight: 700, letterSpacing: "-0.02em", color: COLORS.textPrimary }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = COLORS.accent; el.style.color = COLORS.textInverse; el.style.borderColor = COLORS.accent; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = COLORS.textPrimary; el.style.borderColor = COLORS.border; }}>
          <span>GET IN TOUCH</span>
          <span className="ml-4">→</span>
        </a>
      </div>

      {/* copyright + credit */}
      <div className="flex items-end justify-between label-mono" style={{ color: COLORS.textMuted }}>
        <span>© {new Date().getFullYear()} {PERSON.nameShort}</span>
        <a href="https://thebigint.netlify.app" target="_blank" rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity">
          developed by bigint ↗
        </a>
      </div>
    </footer>
  );
}
