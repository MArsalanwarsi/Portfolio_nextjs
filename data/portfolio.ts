export const siteConfig = {
  name: "Muhammad Arsalan Warsi",
  shortName: "Arsalan",
  role: "Full-Stack Developer",
  specialization: "MERN Stack + Next.js",
  tagline: "Thoughtful product interfaces backed by scalable full-stack systems.",
  description:
    "I build polished web products that balance speed, clarity, and clean architecture. From frontend craft to backend structure, I focus on work that feels premium and performs under real use.",
  intro:
    "Alongside shipping projects, I teach modern web development and help developers turn complex concepts into practical, production-ready thinking.",
  availability: "Available for freelance, internship, and full-time opportunities",
  email: "arsalanwarsi@example.com",
  github: "https://github.com/MArsalanwarsi",
  linkedin: "https://linkedin.com/in/marsalanwarsi",
  resumeUrl: "#",
  portrait: {
    src: "/profile-photo.jpg",
    fallbackSrc: "/profile-photo.svg",
    alt: "Portrait of Muhammad Arsalan Warsi",
    initials: "AW",
  },
  focusAreas: [
    "Premium frontend execution",
    "Scalable MERN architecture",
    "Teaching-led communication",
  ],
  heroMetrics: [
    { value: "03+", label: "Projects shipped" },
    { value: "22", label: "Core technologies" },
    { value: "100+", label: "Students mentored" },
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "tools";
}

export const skills: Skill[] = [
  { name: "HTML5", icon: "Code2", category: "frontend" },
  { name: "CSS3", icon: "Palette", category: "frontend" },
  { name: "JavaScript", icon: "FileCode", category: "frontend" },
  { name: "TypeScript", icon: "FileType", category: "frontend" },
  { name: "React.js", icon: "Atom", category: "frontend" },
  { name: "Next.js", icon: "Globe", category: "frontend" },
  { name: "Tailwind CSS", icon: "Wind", category: "frontend" },
  { name: "Redux Toolkit", icon: "Layers", category: "frontend" },
  { name: "Node.js", icon: "Server", category: "backend" },
  { name: "Express.js", icon: "Zap", category: "backend" },
  { name: "REST APIs", icon: "Network", category: "backend" },
  { name: "JWT Auth", icon: "Shield", category: "backend" },
  { name: "OTP Systems", icon: "KeyRound", category: "backend" },
  { name: "Cookies", icon: "Cookie", category: "backend" },
  { name: "MongoDB", icon: "Database", category: "database" },
  { name: "MySQL", icon: "Table", category: "database" },
  { name: "Git", icon: "GitBranch", category: "tools" },
  { name: "GitHub", icon: "Github", category: "tools" },
  { name: "Cloudinary", icon: "Cloud", category: "tools" },
  { name: "GSAP", icon: "Sparkles", category: "tools" },
  { name: "Gemini API", icon: "Bot", category: "tools" },
  { name: "Nodemailer", icon: "Mail", category: "tools" },
];

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    role: "Teaching Intern",
    company: "Aptech",
    location: "Shahrah-e-Faisal",
    period: "Dec 2025 — Present",
    description: [
      "Teach MERN Stack and PHP development to aspiring developers.",
      "Train students on JWT authentication, cookies, OTP systems, and REST APIs.",
      "Guide real-world projects while reinforcing industry-standard coding practices.",
    ],
    skills: ["MERN Stack", "PHP", "JWT", "REST APIs", "Teaching"],
  },
  {
    role: "Computer Teacher",
    company: "Boston Grammar School",
    location: "",
    period: "Aug 2025 — Dec 2025",
    description: [
      "Taught computing fundamentals and programming concepts.",
      "Introduced students to web technologies, structured problem solving, and logical thinking.",
    ],
    skills: ["Computing", "Programming", "Web Basics"],
  },
];

export interface Project {
  title: string;
  label: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  github: string;
  live: string;
  accent: string;
  surface: string;
}

export const projects: Project[] = [
  {
    title: "Hotel Management System",
    label: "Hospitality Platform",
    description:
      "A full-stack hotel booking and operations system with secure authentication and admin workflows.",
    longDescription:
      "Built as a practical business system for bookings, guest management, and operational control, this project focuses on clear flows, dependable access control, and a backend structure that can scale with real usage.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    features: [
      "Booking and guest management flows",
      "JWT authentication and protected routes",
      "Role-based admin controls",
      "Structured backend for operational scaling",
    ],
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#137c6d",
    surface:
      "linear-gradient(135deg, rgba(19, 124, 109, 0.9), rgba(26, 61, 98, 0.92))",
  },
  {
    title: "Fitness Tracker",
    label: "AI Product Build",
    description:
      "An AI-assisted fitness app with OTP verification, analytics, and secure user flows.",
    longDescription:
      "This project combines fitness tracking with Gemini-powered assistance, OTP verification, and performance-focused UX decisions. It reflects a stronger product mindset around user trust, responsiveness, and practical feature depth.",
    techStack: [
      "React",
      "Redux",
      "Node.js",
      "MongoDB",
      "Gemini AI",
      "Nodemailer",
    ],
    features: [
      "OTP verification with Nodemailer",
      "Gemini AI-powered assistance",
      "JWT and cookie-based authentication",
      "Measured improvements in performance and validation flow",
    ],
    github: "https://github.com/MArsalanwarsi/fitness-tracker-React.git",
    live: "#",
    accent: "#ba6b42",
    surface:
      "linear-gradient(135deg, rgba(186, 107, 66, 0.92), rgba(130, 56, 88, 0.92))",
  },
  {
    title: "Personal Portfolio",
    label: "Design System",
    description:
      "A premium portfolio built to showcase frontend craft, motion, and personal brand clarity.",
    longDescription:
      "This portfolio is treated like a design and frontend case study: intentional typography, layered motion, strong hierarchy, and component decisions aimed at making the work feel considered rather than templated.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    features: [
      "Custom art direction and section choreography",
      "Responsive layouts with layered visual depth",
      "Motion used to support hierarchy and storytelling",
      "A reusable structure for ongoing portfolio updates",
    ],
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#304f8d",
    surface:
      "linear-gradient(135deg, rgba(48, 79, 141, 0.92), rgba(13, 138, 122, 0.88))",
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export const stats: Stat[] = [
  { value: 3, suffix: "+", label: "Projects Built", icon: "FolderGit2" },
  { value: 2, suffix: "+", label: "Professional Roles", icon: "Briefcase" },
  { value: 22, suffix: "", label: "Technologies Used", icon: "Code2" },
  { value: 100, suffix: "+", label: "Students Mentored", icon: "Users" },
];

export const aboutHighlights = [
  {
    title: "Scalable Architecture",
    description:
      "I build systems that stay maintainable as products, features, and teams grow.",
    icon: "Layers",
  },
  {
    title: "Premium UI Thinking",
    description:
      "Interfaces should feel confident, intentional, and easy to trust at a glance.",
    icon: "Palette",
  },
  {
    title: "Performance First",
    description:
      "Fast interaction, clean structure, and reduced friction matter at every layer.",
    icon: "Zap",
  },
  {
    title: "Clear Communication",
    description:
      "Teaching has made me stronger at breaking complexity into useful, practical decisions.",
    icon: "Code2",
  },
];
