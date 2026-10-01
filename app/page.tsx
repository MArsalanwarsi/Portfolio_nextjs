import ScrollAccent from "@/components/ScrollAccent";
import AmbientField from "@/components/AmbientField";
import SectionRail from "@/components/SectionRail";
import ProjectDeck from "@/components/ProjectDeck";
import PortfolioCursor from "@/components/PortfolioCursor";
import SignatureIntro from "@/components/SignatureIntro";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import ContactForm from "@/components/ContactForm";
import {
  MobileMenu,
  ProjectGallery,
  RevealEffects,
} from "@/components/PortfolioInteractions";
import OfflineSupport from "@/components/OfflineSupport";
import {
  aboutContent,
  certificates,
  education,
  experiences,
  navLinks,
  projects,
  siteConfig,
  skillCategories,
  skills,
  skillsContent,
  stats,
  contactContent,
} from "@/data/portfolio";

const copyrightYear = new Date().getFullYear();

function SocialLinks({ resume = false }: { resume?: boolean }) {
  return (
    <div className="social-links">
      <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
        <GithubIcon size={17} />
        <span>Github</span>
      </a>
      <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
        <LinkedinIcon size={17} />
        <span>LinkedIn</span>
      </a>
      <a href={`mailto:${siteConfig.email}`}>
        <Mail size={17} aria-hidden="true" />
        <span>E-mail</span>
      </a>
      <a href={`tel:${siteConfig.phone}`}>
        <Phone size={16} aria-hidden="true" />
        <span>Call me</span>
      </a>
      {resume && (
        <a href={siteConfig.resumeUrl} download>
          <Download size={16} aria-hidden="true" />
          <span>Résumé</span>
        </a>
      )}
    </div>
  );
}

function SectionLabel({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2 className="section-label" id={id}>
      <span aria-hidden="true">… /</span>
      {children}
      <span aria-hidden="true"> …</span>
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <AmbientField />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main id="main-content" className="portfolio">
        <SectionRail />
        <div className="intro-frame" id="home">
          <span className="orbit orbit-header" aria-hidden="true" />
          <header className="site-header">
            <a
              className="wordmark"
              href="#home"
              aria-label={`${siteConfig.name} home`}
            >
              <span className="brand-symbol" aria-hidden="true">
                aw<span>✳</span>
              </span>
              <span className="brand-name">
                ARSALAN WARSI<small>FULL STACK DEVELOPER</small>
              </span>
            </a>
            <nav className="desktop-nav" aria-label="Main navigation">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contacts</a>
            </nav>
            <a href="#contact" className="header-resume">
              Get in touch <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <MobileMenu links={navLinks} />
          </header>

          <section className="hero section-pad" aria-labelledby="hero-title">
            <div className="hero-kicker">
              <span className="availability">
                <span aria-hidden="true" />
                {siteConfig.availability}
              </span>
              <span>{siteConfig.location}</span>
            </div>
            <div className="hero-composition cinematic-hero">
              <div className="hero-coordinate" aria-hidden="true">
                01 / THE DEVELOPER
              </div>
              <h1 id="hero-title">
                <span>Full-stack</span>
                <span>Developer</span>
              </h1>
              <figure className="hero-portrait">
                <Image
                  src={siteConfig.portrait.src}
                  alt={siteConfig.portrait.alt}
                  fill
                  unoptimized
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 700px) 85vw, 460px"
                />
                <figcaption>
                  <span>MUHAMMAD</span>
                  <strong>ARSALAN WARSI</strong>
                </figcaption>
              </figure>
              <div className="hero-editorial">
                <span className="tiny-mono">{siteConfig.specialization}</span>
                <p className="hero-description">
                  MERN Stack developer building{" "}
                  <em>scalable, secure, high-performance</em> web applications.
                </p>
                <a className="split-link hero-cta" href="#projects">
                  <span>Explore my work</span>
                  <span className="round-arrow">
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </a>
              </div>
              <div className="hero-side-note">
                <span className="hero-cross" aria-hidden="true">
                  +
                </span>
                <p>
                  Clean interfaces.
                  <br />
                  Readable architecture.
                  <br />
                  <em>Practical engineering.</em>
                </p>
                <a href={siteConfig.resumeUrl} download>
                  Download résumé <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
              <span className="hero-frame-line" aria-hidden="true" />
              <span className="hero-frame-orbit" aria-hidden="true" />
              <div className="hero-image-index" aria-hidden="true">
                &lt; / &gt;<span>DESIGN / DEVELOP / DELIVER</span>
              </div>
            </div>
            <SocialLinks resume />
            <div className="hero-baseline">
              <span>{siteConfig.specialization}</span>
              <a href="#about">
                Scroll to explore <ArrowDown size={14} aria-hidden="true" />
              </a>
            </div>
          </section>

          <section
            className="about-section section-pad"
            id="about"
            aria-labelledby="about-title"
          >
            <span className="orbit orbit-about" aria-hidden="true" />
            <div className="about-intro reveal">
              <SectionLabel id="about-title">About me</SectionLabel>
              <div>
                <p className="about-lead">{aboutContent.intro.headline}</p>
                <p className="muted">{siteConfig.intro}</p>
              </div>
            </div>
            <div className="about-layout">
              <div className="skills-composition" id="skills">
                <h3 className="sr-only">
                  {skillsContent.header.title} {skillsContent.header.accent}
                </h3>
                {skillCategories.map((category, i) => (
                  <article
                    key={category.key}
                    className={`skill-card skill-card-${category.key} reveal${i === 0 ? " light-card" : ""}`}
                  >
                    <h4>
                      {category.title === "Frontend"
                        ? "Front-end"
                        : category.title === "Backend"
                          ? "Back-end"
                          : category.title}
                    </h4>
                    <p className="skill-list">
                      {skills
                        .filter((skill) => skill.category === category.key)
                        .map((skill) => skill.name)
                        .join(" / ")}
                    </p>
                    <p className="skill-note">{category.description}</p>
                  </article>
                ))}
                <a
                  className="skill-github"
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Explore my GitHub profile"
                >
                  <span>
                    <GithubIcon size={20} />
                  </span>
                  <span className="round-arrow">
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </a>
                <p className="skills-caption">
                  Some of my <em>favorite technologies, topics, and tools</em>{" "}
                  that I work with.
                </p>
              </div>
              <div className="profile-column reveal">
                <figure className="portrait">
                  <Image
                    src={siteConfig.portrait.src}
                    alt={siteConfig.portrait.alt}
                    width={720}
                    height={900}
                    unoptimized
                  />
                  <figcaption>
                    <span>{siteConfig.shortName} Warsi</span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </figcaption>
                </figure>
                <p className="profile-bio">{siteConfig.description}</p>
                <details className="quiet-details">
                  <summary>
                    More about my approach <span aria-hidden="true">+</span>
                  </summary>
                  <div>
                    <p>{aboutContent.intro.description}</p>
                    <p>{siteConfig.heroCard.title}</p>
                    <p>{siteConfig.heroCard.description}</p>
                    <ul>
                      {siteConfig.focusAreas.map((area) => (
                        <li key={area}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </details>
                <div className="profile-metrics">
                  {siteConfig.heroMetrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="approach-grid">
              {aboutContent.highlights.map((item, i) => (
                <div key={item.title} className="reveal">
                  <span className="tiny-mono">0{i + 1} /</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="experience-section"
            id="experience"
            aria-labelledby="work-title"
          >
            <div className="section-heading section-pad reveal">
              <p className="tiny-mono">Experience / 01</p>
              <h2 id="work-title" className="display-title">
                Work
              </h2>
            </div>
            <div className="experience-table">
              {experiences.map((experience, i) => (
                <details
                  key={experience.company}
                  className={`experience-row${i === 0 ? " featured-row" : ""}`}
                  open={i === 0}
                >
                  <summary>
                    <span className="work-period">{experience.period}</span>
                    <span className="work-company">{experience.company}</span>
                    <span className="work-role">
                      {experience.role}
                      <span className="row-plus" aria-hidden="true">
                        +
                      </span>
                    </span>
                  </summary>
                  <div className="work-details">
                    <p>{experience.location}</p>
                    <ul>
                      {experience.description.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="tiny-mono">{experience.skills.join(" / ")}</p>
                  </div>
                </details>
              ))}
            </div>
            <div className="experience-footer">
              <p>
                Practical engineering.
                <br />
                <em>Teaching-led communication.</em>
              </p>
              <a href={siteConfig.resumeUrl} download>
                Download résumé <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </section>

          <section
            className="education-section section-pad"
            id="education"
            aria-labelledby="education-title"
          >
            <SectionLabel id="education-title">Education</SectionLabel>
            <div className="education-grid">
              {education.map((item) => (
                <article key={item.degree} className="education-card reveal">
                  <div className="card-meta">
                    <span>{item.period}</span>
                    <span>{item.result}</span>
                  </div>
                  <h3>{item.degree}</h3>
                  <p className="education-institution">{item.institution}</p>
                  <p>{item.description}</p>
                  <p className="tiny-mono">{item.highlights.join(" / ")}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section
          className="projects-section section-pad"
          id="projects"
          aria-labelledby="projects-title"
        >
          <div className="projects-heading reveal">
            <SectionLabel id="projects-title">Projects</SectionLabel>
            <span className="tiny-mono">
              Selected work / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <ProjectDeck titles={projects.map((project) => project.title)}>
            {projects.map((project, index) => (
              <article
                className={`project-row project-layout-${index % 2}`}
                key={project.title}
                id={`project-${index + 1}`}
              >
                <span className="orbit project-orbit" aria-hidden="true" />
                <div className="project-copy">
                  <p className="project-number">
                    {String(index + 1).padStart(2, "0")} / {project.label}
                  </p>
                  <h3>{project.title}</h3>
                  <div className="tech-tags">
                    {project.techStack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <p className="project-description">{project.description}</p>
                  <details className="quiet-details">
                    <summary>
                      Explore the project <span aria-hidden="true">+</span>
                    </summary>
                    <div>
                      <p>{project.longDescription}</p>
                      <h4>Key features</h4>
                      <ul>
                        {project.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                      <h4>Tools & workflow</h4>
                      <p className="tiny-mono">{project.tools.join(" / ")}</p>
                      <h4>Outcome</h4>
                      <p>{project.outcome}</p>
                    </div>
                  </details>
                  <div className="project-links">
                    {project.github !== "#" ? (
                      <a
                        className="source-link"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source on GitHub`}
                      >
                        <GithubIcon size={19} />
                      </a>
                    ) : (
                      <span className="tiny-mono">Private project</span>
                    )}
                    {project.live !== "#" ? (
                      <a
                        className="round-arrow"
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title} live demo`}
                      >
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : (
                      <a
                        className="round-arrow"
                        href="#contact"
                        aria-label={`Ask about ${project.title}`}
                      >
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
                <ProjectGallery
                  images={project.images}
                  title={project.title}
                  index={index}
                />
              </article>
            ))}
          </ProjectDeck>
        </section>

        <section
          className="certificates-section"
          id="certificates"
          aria-labelledby="certificates-title"
        >
          <div className="section-heading section-pad reveal">
            <p className="tiny-mono">Learning never stops /</p>
            <h2 id="certificates-title" className="display-title">
              Credentials
            </h2>
          </div>
          <div className="credentials-layout section-pad">
            <div className="credentials-aside">
              <span className="round-index">06</span>
              <p>
                Certificates
                <br />& awards
              </p>
              <ArrowDown size={18} aria-hidden="true" />
            </div>
            <div className="certificates-grid">
              {certificates.map((certificate, index) => (
                <article
                  className="certificate-card reveal"
                  key={certificate.title}
                >
                  <div className="card-meta">
                    <span>{certificate.issuer}</span>
                    <span>{certificate.date}</span>
                  </div>
                  <h3>{certificate.title}</h3>
                  <p>{certificate.description}</p>
                  <span className="certificate-index">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    <span>
                      {certificate.icon === "Award" &&
                      certificate.title.includes("Ambassador")
                        ? "Award"
                        : "Certificate"}
                    </span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="stats-section section-pad"
          aria-label="Portfolio statistics"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="reveal">
              <strong>
                {String(stat.value).padStart(2, "0")}
                {stat.suffix}
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section
          className="contact-section section-pad"
          id="contact"
          aria-labelledby="contact-title"
        >
          <span className="orbit orbit-contact" aria-hidden="true" />
          <div className="contact-intro reveal">
            <SectionLabel id="contact-title">Contacts</SectionLabel>
            <h2 className="contact-heading">
              Let’s build
              <br />
              <em>something good.</em>
            </h2>
            <p>{contactContent.card.description}</p>
            <a className="contact-email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <p className="contact-location">
              <MapPin size={15} aria-hidden="true" />
              {siteConfig.location}
              <span> / </span>
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            </p>
          </div>
          <ContactForm />
        </section>

        <footer className="site-footer section-pad">
          <div className="footer-top">
            <div className="footer-name">
              <span>Muhammad</span>
              <span>Arsalan Warsi</span>
              <p>{siteConfig.role}</p>
            </div>
            <div className="footer-info">
              <nav aria-label="Footer navigation">
                {navLinks.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="site-note">
                <h2>Site</h2>
                <p>
                  Handcrafted by{" "}
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Arsalan
                  </a>{" "}
                  /<br />
                  Powered by Next.js /<br />
                  <a href={siteConfig.website}>
                    arsalanwarsi.vercel.app{" "}
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </p>
              </div>
            </div>
          </div>
          <SocialLinks resume />
          <div className="footer-baseline">
            <span>
              © {copyrightYear} {siteConfig.name}
            </span>
            <a href="#home">
              Back to top <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </footer>
      </main>
      <RevealEffects />
      <PortfolioCursor />
      <ScrollAccent />
      <SignatureIntro />
      <OfflineSupport />
    </>
  );
}
