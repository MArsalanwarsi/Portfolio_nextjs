import portfolioData from "./portfolio.json";

export type SkillCategory = "frontend" | "backend" | "database" | "tools";
export type SectionAlign = "left" | "center";

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    type: "website";
    locale: string;
  };
}

export interface SectionHeaderData {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
  align?: SectionAlign;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  specialization: string;
  tagline: string;
  description: string;
  intro: string;
  availability: string;
  location: string;
  website: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  portrait: {
    src: string;
    fallbackSrc: string;
    alt: string;
    initials: string;
  };
  heroCard: {
    eyebrow: string;
    title: string;
    description: string;
  };
  focusAreas: string[];
  heroMetrics: Array<{
    value: string;
    label: string;
  }>;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface AboutHighlight {
  title: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  header: SectionHeaderData;
  intro: {
    badge: string;
    headline: string;
    description: string;
  };
  highlights: AboutHighlight[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface ExperienceContent {
  header: SectionHeaderData;
  items: Experience[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  result: string;
  description: string;
  highlights: string[];
}

export interface EducationContent {
  header: SectionHeaderData;
  items: Education[];
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}

export interface SkillCategoryContent {
  key: SkillCategory;
  title: string;
  description: string;
}

export interface SkillsContent {
  header: SectionHeaderData;
  stackHighlights: string[];
  categories: SkillCategoryContent[];
  items: Skill[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

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

export interface ProjectsContent {
  header: SectionHeaderData;
  previewMeta: Array<{
    label: string;
    value: string;
  }>;
  items: Project[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
}

export interface CertificatesContent {
  header: SectionHeaderData;
  items: Certificate[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface StatsContent {
  header: SectionHeaderData;
  items: Stat[];
}

export interface ContactContent {
  header: SectionHeaderData;
  card: {
    eyebrow: string;
    description: string;
    emailButton: string;
    linkedinButton: string;
  };
  form: {
    badge: string;
    title: string;
    description: string;
    fields: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      subject: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
    };
    validationMessages: {
      nameRequired: string;
      nameMax: string;
      emailInvalid: string;
      emailMax: string;
      subjectRequired: string;
      subjectMax: string;
      messageMin: string;
      messageMax: string;
      contentTooLarge: string;
      invalidFormat: string;
      rateLimited: string;
      invalidBody: string;
      highlightedFields: string;
      emailNotConfigured: string;
      sendFailed: string;
    };
    submitIdle: string;
    submitLoading: string;
    successFallback: string;
    errorFallback: string;
  };
}

export interface PortfolioData {
  seo: SeoConfig;
  siteConfig: SiteConfig;
  navigation: NavLink[];
  sections: {
    about: AboutContent;
    experience: ExperienceContent;
    education: EducationContent;
    skills: SkillsContent;
    projects: ProjectsContent;
    certificates: CertificatesContent;
    stats: StatsContent;
    contact: ContactContent;
  };
}

export const portfolio = portfolioData as PortfolioData;

export const seo = portfolio.seo;
export const siteConfig = portfolio.siteConfig;
export const navLinks = portfolio.navigation;

export const aboutContent = portfolio.sections.about;
export const aboutHighlights = aboutContent.highlights;

export const experienceContent = portfolio.sections.experience;
export const experiences = experienceContent.items;

export const educationContent = portfolio.sections.education;
export const education = educationContent.items;

export const skillsContent = portfolio.sections.skills;
export const stackHighlights = skillsContent.stackHighlights;
export const skillCategories = skillsContent.categories;
export const skills = skillsContent.items;

export const projectsContent = portfolio.sections.projects;
export const projects = projectsContent.items;

export const certificatesContent = portfolio.sections.certificates;
export const certificates = certificatesContent.items;

export const statsContent = portfolio.sections.stats;
export const stats = statsContent.items;

export const contactContent = portfolio.sections.contact;

export default portfolio;
