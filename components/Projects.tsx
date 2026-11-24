import GithubRepoArchive from "@/components/GithubRepoArchive";
import ProjectCarousel from "@/components/ProjectCarousel";
import { projectsContent } from "@/data/portfolio";
import styles from "./ProjectPresentation.module.css";

export default function Projects() {
  return (
    <section id="projects" data-surface="dark" aria-labelledby="work-heading" className={styles.projects}>
      <div className={styles.sectionInner}>
        <h2 id="work-heading" className={styles.heading}>Selected <em>work.</em></h2>
        <ProjectCarousel projects={projectsContent.items} />
        <GithubRepoArchive />
      </div>
    </section>
  );
}

