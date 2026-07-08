export const siteConfig = {
  name: "Muhammad Arsalan Warsi",
  shortName: "Arsalan",
  role: "Full-Stack Next.js Developer",
  specialization: "MERN Stack + Next.js",
  tagline: "Full-stack developer focused on polished interfaces and dependable MERN product builds.",
  description:
    "I design and build responsive web apps with React, Next.js, Node.js, and MongoDB - from interface systems to production-ready APIs.",
  intro:
    "I teach web development and build practical products with clear interfaces, readable code, and dependable full-stack structure.",
  availability: "Open to work",
  email: "arsalanwarsi@example.com",
  github: "https://github.com/MArsalanwarsi",
  linkedin: "https://linkedin.com/in/marsalanwarsi",
  resumeUrl: "#",
  portrait: {
    src: "/header-photo.png",
    fallbackSrc: "/profile-photo.svg",
    alt: "Portrait of Muhammad Arsalan Warsi",
    initials: "AW",
  },
  focusAreas: [
    "Production UI",
    "API architecture",
    "Teaching-led communication",
  ],
  heroMetrics: [
    { value: "06+", label: "Projects" },
    { value: "39", label: "Skills & tools" },
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
  { name: "shadcn/ui", icon: "Component", category: "frontend" },
  { name: "Base UI", icon: "Blocks", category: "frontend" },
  { name: "Responsive UI", icon: "PanelsTopLeft", category: "frontend" },
  { name: "Accessibility", icon: "ShieldCheck", category: "frontend" },
  { name: "Node.js", icon: "Server", category: "backend" },
  { name: "Express.js", icon: "Zap", category: "backend" },
  { name: "REST APIs", icon: "Network", category: "backend" },
  { name: "API Routing", icon: "Route", category: "backend" },
  { name: "JWT Auth", icon: "Shield", category: "backend" },
  { name: "OTP Systems", icon: "KeyRound", category: "backend" },
  { name: "Cookies", icon: "Cookie", category: "backend" },
  { name: "Auth Guards", icon: "LockKeyhole", category: "backend" },
  { name: "Server Logic", icon: "ServerCog", category: "backend" },
  { name: "MongoDB", icon: "Database", category: "database" },
  { name: "Mongoose", icon: "DatabaseZap", category: "database" },
  { name: "MySQL", icon: "Table", category: "database" },
  { name: "Schema Design", icon: "Braces", category: "database" },
  { name: "Data Modeling", icon: "Workflow", category: "database" },
  { name: "Git", icon: "GitBranch", category: "tools" },
  { name: "GitHub", icon: "Github", category: "tools" },
  { name: "VS Code", icon: "Code2", category: "tools" },
  { name: "npm", icon: "Package", category: "tools" },
  { name: "Postman", icon: "Plug", category: "tools" },
  { name: "Vercel", icon: "CloudUpload", category: "tools" },
  { name: "Cloudinary", icon: "Cloud", category: "tools" },
  { name: "Gemini API", icon: "Bot", category: "tools" },
  { name: "Nodemailer", icon: "Mail", category: "tools" },
  { name: "Chrome DevTools", icon: "MonitorCog", category: "tools" },
  { name: "Oxlint", icon: "TestTubeDiagonal", category: "tools" },
  { name: "Figma", icon: "Frame", category: "tools" },
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
  tools: string[];
  features: string[];
  outcome: string;
  github: string;
  live: string;
  accent: string;
  surface: string;
  images: ProjectImage[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
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
    tools: ["Postman", "JWT", "MongoDB Atlas", "GitHub"],
    features: [
      "Booking and guest management",
      "JWT auth and protected routes",
      "Role-based admin controls",
    ],
    outcome: "Operational booking flow with admin-ready data screens.",
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#ff365d",
    surface:
      "linear-gradient(135deg, #ff365d 0%, #5b1231 52%, #100710 100%)",
    images: [
      {
        src: "/projects/hotel-booking.svg",
        alt: "Hotel Management System booking dashboard preview",
        caption: "Booking desk",
      },
      {
        src: "/projects/hotel-admin.svg",
        alt: "Hotel Management System admin room controls preview",
        caption: "Admin controls",
      },
    ],
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
    tools: ["Gemini API", "Nodemailer", "Redux DevTools", "MongoDB"],
    features: [
      "OTP verification with Nodemailer",
      "Gemini-powered assistance",
      "JWT and cookie-based auth",
    ],
    outcome: "Personalized fitness tracking with secure account recovery.",
    github: "https://github.com/MArsalanwarsi/fitness-tracker-React.git",
    live: "#",
    accent: "#a855f7",
    surface:
      "linear-gradient(135deg, #a855f7 0%, #4c1d95 54%, #100710 100%)",
    images: [
      {
        src: "/projects/fitness-dashboard.svg",
        alt: "Fitness Tracker analytics dashboard preview",
        caption: "Progress dashboard",
      },
      {
        src: "/projects/fitness-ai.svg",
        alt: "Fitness Tracker AI assistant preview",
        caption: "AI assistant",
      },
    ],
  },
  {
    title: "Personal Portfolio",
    label: "Design System",
    description:
      "Portfolio with responsive UI, dark/light themes, shadcn components, and clear personal branding.",
    longDescription:
      "Personal portfolio built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    tools: ["Next.js", "Base UI", "Tailwind CSS", "Oxlint"],
    features: [
      "Responsive layouts",
      "Custom motion and transitions",
      "Reusable component structure",
    ],
    outcome: "Personal brand system with fast, responsive presentation.",
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#e11d48",
    surface:
      "linear-gradient(135deg, #e11d48 0%, #7e22ce 50%, #100710 100%)",
    images: [
      {
        src: "/projects/portfolio-home.svg",
        alt: "Personal Portfolio hero and navigation preview",
        caption: "Home system",
      },
      {
        src: "/projects/portfolio-sections.svg",
        alt: "Personal Portfolio component section preview",
        caption: "Section rhythm",
      },
    ],
  },
  {
    title: "E-Commerce Dashboard",
    label: "Admin Platform",
    description:
      "Admin dashboard for managing products, orders, and customers with analytics and real-time data.",
    longDescription:
      "Full-featured admin panel with charts, product CRUD, and order tracking.",
    techStack: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Chart.js"],
    tools: ["Redux Toolkit", "Chart.js", "Postman", "MongoDB"],
    features: [
      "Product and order management",
      "Sales analytics dashboard",
      "Role-based access control",
    ],
    outcome: "Admin workflows organized around fast scanning and action.",
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#7c3aed",
    surface:
      "linear-gradient(135deg, #7c3aed 0%, #be123c 42%, #100710 100%)",
    images: [
      {
        src: "/projects/ecommerce-dashboard.svg",
        alt: "E-Commerce Dashboard analytics screen preview",
        caption: "Revenue overview",
      },
      {
        src: "/projects/ecommerce-products.svg",
        alt: "E-Commerce Dashboard product management preview",
        caption: "Product table",
      },
    ],
  },
  {
    title: "Task Manager App",
    label: "Productivity Tool",
    description:
      "Collaborative task management app with real-time updates, drag-and-drop, and team workflows.",
    longDescription:
      "Task manager with kanban board, team collaboration, and deadline tracking.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    tools: ["Socket.io", "Express", "MongoDB", "GitHub"],
    features: [
      "Drag-and-drop task board",
      "Real-time collaboration",
      "Priority and deadline tracking",
    ],
    outcome: "Collaborative task board that keeps team status visible.",
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#c026d3",
    surface:
      "linear-gradient(135deg, #c026d3 0%, #5b1231 55%, #100710 100%)",
    images: [
      {
        src: "/projects/task-board.svg",
        alt: "Task Manager kanban board preview",
        caption: "Kanban board",
      },
      {
        src: "/projects/task-timeline.svg",
        alt: "Task Manager timeline and priority preview",
        caption: "Timeline view",
      },
    ],
  },
  {
    title: "Blog Platform",
    label: "Content System",
    description:
      "Full-stack blogging platform with rich text editor, image uploads via Cloudinary, and comments.",
    longDescription:
      "Blog platform with markdown editor, media management, and comment system.",
    techStack: ["Next.js", "Node.js", "MongoDB", "Cloudinary", "JWT"],
    tools: ["Cloudinary", "Markdown", "JWT", "Next.js"],
    features: [
      "Rich text editor with markdown",
      "Image uploads via Cloudinary",
      "Comment and like system",
    ],
    outcome: "Publishing workflow with media handling and account features.",
    github: "https://github.com/MArsalanwarsi",
    live: "#",
    accent: "#be123c",
    surface:
      "linear-gradient(135deg, #be123c 0%, #581c87 42%, #100710 100%)",
    images: [
      {
        src: "/projects/blog-editor.svg",
        alt: "Blog Platform editor preview",
        caption: "Writing desk",
      },
      {
        src: "/projects/blog-library.svg",
        alt: "Blog Platform content library preview",
        caption: "Content library",
      },
    ],
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
  { value: 39, suffix: "", label: "Skills & tools", icon: "Code2" },
  { value: 100, suffix: "+", label: "Students", icon: "Users" },
];

export const aboutHighlights = [
  {
    title: "Feature Architecture",
    description: "Builds that stay organized as features grow.",
    icon: "Layers",
  },
  {
    title: "Interface Clarity",
    description: "Clean interfaces that feel professional and easy to use.",
    icon: "Palette",
  },
  {
    title: "Fast Feedback",
    description: "Fast loading and smooth interaction across the app.",
    icon: "Zap",
  },
  {
    title: "Teaching-Led Communication",
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
