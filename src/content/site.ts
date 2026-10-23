/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ZENITH'26 — CONTENT SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 * Every fact, name, link and image on the site comes from this file.
 * When the Zenith'26 details are finalised, update the values here —
 * the whole site updates with them.
 *
 * Content rules applied:
 *  - Event facts preserved from Zenith'25 (zenith2k25.vercel.app).
 *  - No invented statistics, speakers, sponsors or announcements.
 *  - Anything not yet published is marked `tba` / kept as an editable placeholder.
 */

/**
 * Primary registration destination. `"#"` is an inert placeholder — every
 * Register CTA stays on the page (see the bare-hash guard in main.tsx).
 * Replace with the Zenith'26 registration URL once it opens.
 */
export const REGISTER_URL = "#";

/** Zenith'26 countdown target. null → the countdown is not rendered. */
export const COUNTDOWN_TARGET: string | null = "2026-12-17T00:00:00";
// e.g. "2026-12-17T00:00:00" — set once the official Zenith'26 dates are announced.

export const event = {
  name: "ZENITH",
  year: "'26",
  edition: "2026",
  tagline: "National Technical Symposium",
  organizer: "SCOPE Club",
  institute: "MLR Institute of Technology",
  instituteShort: "MLRIT",
  city: "Hyderabad",
  state: "Telangana",
  datesLabel: "DEC 17 — 19",
  venueLine: "MLRIT CAMPUS · HYDERABAD",
  intro:
    "Zenith is a 3-day national event featuring the AWS Community Day followed by a 24-hour hackathon. It focuses mainly on HealthTech, with additional domains in EduTech and AgriTech, encouraging students to develop innovative solutions using technologies like AI, ML and other Technologies to solve real-world problems.",
  shortIntro:
    "A 3-day national event featuring the AWS Community Day followed by a 24-hour hackathon — built around HealthTech, EduTech and AgriTech.",
} as const;

export const nav = [
  { label: "About", href: "#brief" },
  { label: "Domains", href: "#domains" },
  { label: "Program", href: "#program" },
  { label: "Speakers", href: "#speakers" },
  { label: "FAQ", href: "#faq" },
] as const;

/** The event's two sub-events — surfaced as the hero's glass cards. */
export const heroCards = [
  { title: "AWS Student Community Day", meta: "Day 1 · Dec 17" },
  { title: "24-Hour National Hackathon", meta: "Day 2 — 3 · ₹1,00,000" },
] as const;

export const highlights = [
  { value: 3, display: "03", suffix: "", label: "Days", note: "AWS Community Day + 24-hour hackathon" },
  { value: 24, display: "24", suffix: "", label: "Hour Hackathon", note: "Non-stop build sprint" },
  { value: 100000, display: "1,00,000", prefix: "₹", label: "Prize Pool", note: "Across three domains, with exciting rewards" },
  { value: 3, display: "03", label: "Domains", note: "HealthTech · EduTech · AgriTech" },
] as const;

export const objectives = [
  "Encourage innovation and problem-solving",
  "Build hands-on learning and skill development",
  "Promote collaboration and teamwork",
  "Foster competitive spirit and engagement",
  "Connect with industry experts and mentors",
  "Gain exposure to cutting-edge technologies",
] as const;

export const whyJoin = [
  {
    title: "Learn & Innovate",
    body: "Gain hands-on experience and strengthen your real-world problem-solving skills.",
  },
  {
    title: "Network",
    body: "Connect with industry experts and like-minded innovators during the AWS Community Day.",
  },
  {
    title: "Win Prizes",
    body: "A prize pool of ₹1,00,000 across three domains, along with exciting rewards, awaits you.",
  },
] as const;

export const domains = [
  {
    id: "healthcare",
    index: "01",
    name: "Healthcare",
    image: "/img/domain-healthcare.png",
    body: "Develop solutions that strengthen healthcare delivery through improved patient care, effective wellness monitoring and streamlined hospital management.",
  },
  {
    id: "education",
    index: "02",
    name: "Education",
    image: "/img/domain-education.png",
    body: "Design solutions that enhance personalized learning, increase student engagement and support virtual classrooms, assessment tools and skill-building platforms.",
  },
  {
    id: "agritech",
    index: "03",
    name: "Agri Tech",
    image: "/img/domain-agritech.png",
    body: "Develop technologies that empower farmers, optimize crop management, improve food quality and address key supply-chain challenges.",
  },
] as const;

export const program = [
  {
    index: "01",
    day: "Day 1",
    title: "AWS Community Day",
    body: "Connect with cloud innovators and AWS experts. Dive deep into cloud architecture, scalable solutions, and cutting-edge AWS services. Network with industry leaders and learn best practices that power the world's most innovative companies.",
    tags: ["Networking", "AWS Services", "Cloud"],
  },
  {
    index: "02",
    day: "Day 1",
    title: "Technical Workshops",
    body: "Immersive hands-on sessions with industry veterans. Build real-world projects, master cutting-edge frameworks, and gain skills that set you apart in the tech industry.",
    tags: ["Skill Building", "Hands On", "Learning"],
  },
  {
    index: "03",
    day: "Day 2 — 3",
    title: "24-Hour Hackathon",
    body: "An intense coding marathon where innovation meets execution. Build groundbreaking solutions, collaborate with brilliant minds, and compete for exciting prizes. Transform your ideas into working prototypes that solve real-world problems.",
    tags: ["Innovation", "Collaboration", "Competition"],
  },
] as const;

export const timeline = [
  {
    date: "Nov 17",
    title: "Registrations Start",
    body: "Start your journey towards Zenith by securing your spot.",
  },
  {
    date: "Dec 17",
    title: "AWS Community Day",
    body: "Gain insights from industry leaders and build valuable professional connections.",
  },
  {
    date: "Dec 18",
    title: "Hackathon Begins",
    body: "The 24-hour coding challenge officially begins.",
  },
  {
    date: "Dec 19",
    title: "Final Presentations",
    body: "Teams present their innovative solutions to the judging panel.",
  },
  {
    date: "Dec 19",
    title: "Winner Announcement",
    body: "Recognizing outstanding teams and celebrating their achievements.",
  },
] as const;

export const speakers = [
  {
    name: "Nagababu Medicharla",
    role: "Principal Cloud Architect | AWS Ambassador | AWS Community Builder",
    image: "/img/speakers/nagababu-medicharla.jpg",
    linkedin: "https://www.linkedin.com/in/nagababu-medicharla-b2a91a117/",
  },
  {
    name: "Raghu Reddy",
    role: "Lead Data Platform Engineer @ Razor Group | Ex- ZScaler | Cloud Native Organizers | AWS Community Builder | Platform Engineer | MLOps | GitOps | CKA Certified | Terraform Certified | AWS | 3X Azure | Speaker",
    image: "/img/speakers/raghu-reddy.jpg",
    linkedin: "https://www.linkedin.com/in/raghureddycloud",
  },
  {
    name: "Varsha Verma",
    role: "AWS Community Builder | 11K+ LinkedIn | Tech Speaker | Lead Cloud Engineer | AWS | LINUX | DEVOPS | Terraform | DevOps Community Lead at TWS | Blogger | Public Speaker | Tech influencer",
    image: "/img/speakers/varsha-verma.jpg",
    linkedin: "https://www.linkedin.com/in/varsha-verma-cloud-devops",
  },
  {
    name: "Satyajit Samantray",
    role: "Principal Cloud Architect at Searce | AWS Community Builder | AWS Ambassador | Public Speaker | 7*AWS |1*AZURE | 1*GCP | CKA certified | Terraform | Linux | Hadoop| Helping Customers adopt Cloud",
    image: "/img/speakers/satyajit-samantray.jpg",
    linkedin: "https://www.linkedin.com/in/satyajit-samantray-b30a7075",
  },
  {
    name: "Vishnu Rachapudi",
    role: "Works at @SUDO | AWS Community Builder | 12x AWS Certified | K[CNA,CSA] | Your Friendly Neighbourhood Cloud Guy",
    image: "/img/speakers/vishnu-rachapudi.jpg",
    linkedin: "https://www.linkedin.com/in/vishnu-rachapudi-28956920b",
  },
  {
    name: "Avinash Reddy Thipparthi",
    role: "Aviz Academy | 8x AWS Certified | AWS Community Builder | Docker Captain",
    image: "/img/speakers/avinash-reddy-thipparthi.jpg",
    linkedin: "https://www.linkedin.com/in/avizway",
  },
] as const;

export const partners = {
  organizers: [
    { name: "SCOPE Club", image: "/img/scope-logo.png" },
    { name: "MLR Institute of Technology", image: "/img/mlrit-logo.png" },
  ],
  /** Sponsor slots — the Zenith'25 site published "Revealing Soon...." for each. */
  sponsorSlots: ["Revealing Soon", "Revealing Soon", "Revealing Soon", "Revealing Soon"],
} as const;

export const faqs = [
  {
    q: "What are the hackathon domains?",
    a: "The hackathon covers three domains: Education, Healthcare and Agriculture.",
  },
  {
    q: "What is the structure of the event?",
    a: "It is a 3-day event that includes workshops and competitions conducted simultaneously.",
  },
  {
    q: "What tools and technologies can I use?",
    a: "Participants can use any programming languages, frameworks or tools. AI-generated code is allowed, but you must understand its implementation.",
  },
  {
    q: "Do I need a team to participate?",
    a: "You can participate individually or as part of a team with up to four members. If you don't have a team, we'll help you form one at the venue.",
  },
  {
    q: "Will food or refreshments be provided?",
    a: "Yes, refreshments will be provided for all participants during the event hours.",
  },
  {
    q: "How will the projects be evaluated?",
    a: "Projects will be evaluated based on innovation, technical implementation, user experience, feasibility and presentation.",
  },
] as const;

export const links = {
  problemStatements: "https://zenithps.vercel.app/",
  itinerary: "https://zenith-itinerary.vercel.app/",
} as const;

export const contact = {
  email: "scopeclub@mlrinstitutions.ac.in",
  people: [
    { name: "Ravindher", phone: "+91 70327 93341", tel: "+917032793341" },
    { name: "Ketana", phone: "+91 83285 56430", tel: "+918328556430" },
  ],
  address: {
    line1: "Scope Club — MT003",
    line2: "MLR Institute of Technology",
    line3: "Hyderabad, Telangana, India",
    pin: "500043",
  },
} as const;

export const socials = [
  { name: "Instagram", url: "https://www.instagram.com/mlrit_scope/", icon: "instagram" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/scope-club-mlrit-9017541a3/?originalSubdomain=in", icon: "linkedin" },
  { name: "X", url: "https://x.com/MlritScope", icon: "x" },
  { name: "GitHub", url: "https://github.com/scopeclub", icon: "github" },
] as const;
