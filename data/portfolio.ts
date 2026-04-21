export const siteConfig = {
  name: "Muhammad Arsalan Warsi",
  shortName: "Arsalan",
  role: "Full-Stack Developer",
  specialization: "MERN Stack + Next.js",
  tagline: "Full-stack developer focused on React, Next.js, and MERN apps.",
  description:
    "I build clean, responsive web apps with React, Next.js, Node.js, and MongoDB.",
  intro:
    "I teach web development and build practical products with a focus on clear UI and solid structure.",
  availability: "Open to work",
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
    "React & Next.js",
    "Node.js & APIs",
    "Clear communication",
  ],
  heroMetrics: [
    { value: "06+", label: "Projects" },
    { value: "22", label: "Technologies" },
    { value: "100+", label: "Students taught" },
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
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
      "Teach MERN Stack and PHP to students.",
      "Cover JWT auth, REST APIs, cookies, and project-based learning.",
      "Guide students through practical assignments and code reviews.",
    ],
    skills: ["MERN Stack", "PHP", "JWT", "REST APIs", "Teaching"],
  },
  {
    role: "Computer Teacher",
    company: "Boston Grammar School",
    location: "",
    period: "Aug 2025 — Dec 2025",
    description: [
      "Taught computing basics and programming fundamentals.",
      "Introduced web development and problem-solving skills.",
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
      "Full-stack hotel booking app with secure auth, role-based admin, and guest management workflows.",
    longDescription:
      "Full-stack app for bookings, guest records, and admin operations.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    features: [
      "Booking and guest management",
      "JWT auth and protected routes",
      "Role-based admin controls",
    ],
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#7c3aed",
    surface:
      "linear-gradient(135deg, rgba(124, 58, 237, 0.9), rgba(88, 28, 135, 0.92))",
  },
  {
    title: "Fitness Tracker",
    label: "AI Product Build",
    description:
      "Fitness app with OTP verification, AI-powered assistance via Gemini, and comprehensive analytics.",
    longDescription:
      "Tracks fitness activity with OTP login, analytics, and Gemini-powered help.",
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
      "Gemini-powered assistance",
      "JWT and cookie-based auth",
    ],
    github: "https://github.com/MArsalanwarsi/fitness-tracker-React.git",
    live: "#",
    accent: "#a855f7",
    surface:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.92), rgba(109, 40, 217, 0.92))",
  },
  {
    title: "Personal Portfolio",
    label: "Design System",
    description:
      "Portfolio with cinematic motion, responsive UI, dark/light themes, and clear personal branding.",
    longDescription:
      "Personal portfolio built with Next.js, TypeScript, and GSAP.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    features: [
      "Responsive layouts",
      "Custom motion and transitions",
      "Reusable component structure",
    ],
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#c084fc",
    surface:
      "linear-gradient(135deg, rgba(192, 132, 252, 0.92), rgba(124, 58, 237, 0.88))",
  },
  {
    title: "E-Commerce Dashboard",
    label: "Admin Platform",
    description:
      "Admin dashboard for managing products, orders, and customers with analytics and real-time data.",
    longDescription:
      "Full-featured admin panel with charts, product CRUD, and order tracking.",
    techStack: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Chart.js"],
    features: [
      "Product and order management",
      "Sales analytics dashboard",
      "Role-based access control",
    ],
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#7c3aed",
    surface:
      "linear-gradient(135deg, rgba(109, 40, 217, 0.9), rgba(88, 28, 135, 0.92))",
  },
  {
    title: "Task Manager App",
    label: "Productivity Tool",
    description:
      "Collaborative task management app with real-time updates, drag-and-drop, and team workflows.",
    longDescription:
      "Task manager with kanban board, team collaboration, and deadline tracking.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    features: [
      "Drag-and-drop task board",
      "Real-time collaboration",
      "Priority and deadline tracking",
    ],
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#a855f7",
    surface:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(124, 58, 237, 0.92))",
  },
  {
    title: "Blog Platform",
    label: "Content System",
    description:
      "Full-stack blogging platform with rich text editor, image uploads via Cloudinary, and comments.",
    longDescription:
      "Blog platform with markdown editor, media management, and comment system.",
    techStack: ["Next.js", "Node.js", "MongoDB", "Cloudinary", "JWT"],
    features: [
      "Rich text editor with markdown",
      "Image uploads via Cloudinary",
      "Comment and like system",
    ],
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#c084fc",
    surface:
      "linear-gradient(135deg, rgba(192, 132, 252, 0.9), rgba(147, 51, 234, 0.92))",
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export const stats: Stat[] = [
  { value: 6, suffix: "+", label: "Projects", icon: "FolderGit2" },
  { value: 2, suffix: "+", label: "Roles", icon: "Briefcase" },
  { value: 22, suffix: "", label: "Technologies", icon: "Code2" },
  { value: 100, suffix: "+", label: "Students", icon: "Users" },
];

export const aboutHighlights = [
  {
    title: "Scalable Architecture",
    description: "Builds that stay organized as features grow.",
    icon: "Layers",
  },
  {
    title: "Premium UI Thinking",
    description: "Clean interfaces that feel professional and easy to use.",
    icon: "Palette",
  },
  {
    title: "Performance First",
    description: "Fast loading and smooth interaction across the app.",
    icon: "Zap",
  },
  {
    title: "Clear Communication",
    description: "Clear explanations, teamwork, and practical thinking.",
    icon: "Code2",
  },
];

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
}

export const certificates: Certificate[] = [
  {
    title: "Web Development Fundamentals",
    issuer: "Aptech",
    date: "2024",
    description:
      "Comprehensive certification covering HTML, CSS, JavaScript, and responsive web design principles.",
    icon: "Globe",
  },
  {
    title: "MERN Stack Development",
    issuer: "Aptech",
    date: "2024",
    description:
      "Full-stack certification covering MongoDB, Express.js, React, and Node.js with project-based assessment.",
    icon: "Layers",
  },
  {
    title: "JavaScript & TypeScript",
    issuer: "Aptech",
    date: "2024",
    description:
      "Advanced JavaScript patterns, TypeScript type system, and modern ES6+ features.",
    icon: "FileCode",
  },
  {
    title: "Database Management",
    issuer: "Aptech",
    date: "2024",
    description:
      "MongoDB and MySQL database design, optimization, and integration with web applications.",
    icon: "Database",
  },
  {
    title: "Best Student Award",
    issuer: "Aptech Shahrah-e-Faisal",
    date: "2024",
    description:
      "Recognized as the top-performing student for academic excellence and project work.",
    icon: "Award",
  },
  {
    title: "Teaching Excellence",
    issuer: "Boston Grammar School",
    date: "2025",
    description:
      "Awarded for outstanding contribution to Computer Science education and student mentorship.",
    icon: "Star",
  },
];
