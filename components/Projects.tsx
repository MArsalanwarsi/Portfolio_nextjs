import ProjectCarousel from "@/components/ProjectCarousel";
import SectionHeader from "@/components/SectionHeader";
import { projectsContent } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader {...projectsContent.header} />
        <ProjectCarousel projects={projectsContent.items} />
      </div>
    </section>
  );
}
