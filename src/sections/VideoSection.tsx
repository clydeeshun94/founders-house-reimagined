import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VIDEO_URL } from "@/data";
import { COLORS } from "@/config/theme";

gsap.registerPlugin(ScrollTrigger);

export function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrap  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoWrap.current,
        { width: "28vw", height: "28vh", borderRadius: "16px" },
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: false,
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    /* Outer wrapper provides the scroll distance; sticky child stacks over Hero */
    <div ref={sectionRef} style={{ height: "250vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.pageBg,
          zIndex: 10,
        }}
      >
        <div
          ref={videoWrap}
          style={{
            overflow: "hidden",
            position: "relative",
            width: "28vw",
            height: "28vh",
            borderRadius: "16px",
          }}
        >
          <video
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
