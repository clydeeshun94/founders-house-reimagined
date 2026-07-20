/* ============================================================
   CONTENT — single source of truth for all text & site data
   Edit here, changes propagate everywhere automatically.
   ============================================================ */

export const PERSON = {
  name:          "Felix D. Davis",
  nameShort:     "Felix Davis",
  firstName:     "FELIX",
  lastName:      "DAVIS",
  title:         "CEO & Chief Product Architect",
  company:       "Mary Technology",
  introSubheader:"Architecting Global Healthcare Infrastructure",
  introBody:     "Building the operating system for dignified, device-free primary care at population scale.",
  introParagraph:"A Dartmouth-trained computer scientist on a mission to eliminate late-diagnosis deaths — building autonomous diagnostics and healthcare infrastructure for the next century.",
  tagline:       "Building the infrastructure that keeps people alive.",
  links: {
    linkedin:  "https://www.linkedin.com/in/felix-d-davis-72139b255/",
    x:         "https://x.com/dr_dziedzorm",
    instagram: "https://www.instagram.com/dr_dziedzorm",
    reddit:    "https://www.reddit.com/user/Far_Driver_4705/",
    substack:  "https://substack.com/@dr_dziedzorm",
    whatsapp:  "https://wa.me/16033220915",
    email:     "davisdfelix@gmail.com",
  },
} as const;

export const PILLARS = [
  {
    n:      "01",
    title:  "The Stack",
    kicker: "Mary Technology",
    blurb:  "A healthcare infrastructure company on a mission to eliminate late-diagnosis deaths globally. Building the future of primary care — autonomous, dignified, and accessible at population scale.",
    bullets: [
      { layer: "Hardware Layer", name: "PATs",   sub: "Point-of-care Autonomous Terminals",               items: ["Autonomous diagnostic capabilities", "Device-free patient interface", "Built for global deployment"] },
      { layer: "Software Layer", name: "MaryOS", sub: "The operating system for healthcare infrastructure", items: ["Real-time diagnostic orchestration", "Privacy-first architecture", "Population-scale analytics"] },
    ],
  },
  {
    n:      "02",
    title:  "Philosophy",
    kicker: "Psychological Architecture",
    blurb:  "Building systems that respect human dignity. Healthcare shouldn't require expensive devices or literacy. The best technology disappears — invisibly empowering communities to take control of their health outcomes.",
    bullets: [
      { layer: "First Principles", name: "Work Backward",    sub: "What does a patient actually need at the point of care?", items: ["Ignore conventions that don't serve the mission", "Dignity over complexity", "Infrastructure before apps"] },
      { layer: "The Mission",      name: "Zero Late Deaths", sub: "Late diagnosis kills millions annually — most preventable",  items: ["Early detection at population scale", "Communities that need it most", "Catch what would otherwise be caught too late"] },
    ],
  },
  {
    n:      "03",
    title:  "Pedigree",
    kicker: "Dartmouth College",
    blurb:  "Computer Science. Rigorous training in computational theory, systems design, and algorithmic thinking — foundation for building robust, scalable healthcare infrastructure.",
    bullets: [
      { layer: "Neukom Scholar", name: "Research Fellowship", sub: "Computation applied to real-world healthcare challenges", items: ["Led tech initiatives across Ghana", "Managed 150+ engineers across Africa & Southeast Asia", "Shipped 200+ products for early-stage companies"] },
      { layer: "Field Work",     name: "On the Ground",       sub: "Particles for Humanity — nutritional health in Africa",   items: ["Internet infrastructure in underserved communities", "Delivery platforms at community scale", "Early-stage operator across two continents"] },
    ],
  },
] as const;

export const CREDENTIALS = [
  { label: "Institution", value: "Dartmouth College" },
  { label: "Discipline",  value: "Computer Science" },
  { label: "Distinction", value: "Neukom Scholar" },
  { label: "Role",        value: "CEO & Chief Product Architect" },
  { label: "Company",     value: "Mary Technology" },
  { label: "Focus",       value: "Healthcare Infrastructure" },
] as const;

export const MARQUEE_WORDS = [
  "Mary Technology",
  "Autonomous Diagnostics",
  "Dartmouth",
  "Healthcare Infrastructure",
  "Zero Late Deaths",
] as const;

export const LOGOS = [
  "MARY TECHNOLOGY", "DARTMOUTH", "NEUKOM SCHOLAR", "AUTONOMOUS DX",
  "HEALTHCARE INFRA", "COMPUTER SCIENCE", "LATE DIAGNOSIS", "ZERO DEATHS",
] as const;

export const VIDEO_URL = "/grok_video_2026-07-20-16-05-21_1.mp4";

export const GALLERY_ITEMS = [
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", tag: "Community Health", title: "Free Diagnostics Drive",          sub: "Mary Technology deploys PATs across three districts in Accra, screening 4,000 residents in a single weekend." },
  { src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80", tag: "Charity",          title: "Nutritional Health Initiative",   sub: "Partnering with Particles for Humanity to address childhood malnutrition across rural communities in West Africa." },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", tag: "Event",            title: "Healthcare Infrastructure Summit", sub: "Felix Davis keynotes the annual summit on autonomous diagnostics and the future of device-free primary care." },
  { src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",    tag: "Field Work",       title: "Ghana Internet Infrastructure",    sub: "Leading a team of engineers to build last-mile connectivity for underserved communities across the country." },
  { src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80", tag: "Research",         title: "Neukom Scholar Fellowship",        sub: "Dartmouth-backed research applying computational theory to real-world healthcare delivery challenges." },
  { src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80",    tag: "Community Health", title: "MaryOS Field Deployment",           sub: "First live deployment of MaryOS orchestrating diagnostics across a distributed network of PAT terminals." },
  { src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80", tag: "Event",            title: "Zero Late Deaths Conference",      sub: "Bringing together clinicians, engineers and policymakers around a single mission: no preventable death from late diagnosis." },
  { src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80", tag: "Charity",          title: "Southeast Asia Health Access",     sub: "Expanding Mary Technology's reach — managing cross-continental teams shipping healthcare tools for early-stage markets." },
  { src: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=80", tag: "Field Work",       title: "Population-Scale Screening",       sub: "Piloting autonomous screening programs that operate without smartphones, electricity grids, or trained operators." },
  { src: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?w=800&q=80",    tag: "Research",         title: "Autonomous Diagnostics Paper",     sub: "Publishing findings on device-free diagnostic accuracy at population scale — a foundation for the PAT hardware spec." },
] as const;
