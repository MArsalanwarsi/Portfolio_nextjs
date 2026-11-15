import PageScrollMotion from "@/components/PageScrollMotion";
import StudioIntro from "@/components/StudioIntro";
import AnimatedBackground from "@/components/AnimatedBackground";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import PremiumMotion from "@/components/PremiumMotion";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SocialDeck from "@/components/SocialDeck";

import Stats from "@/components/Stats";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <PremiumMotion>
      <StudioIntro />
      <PageScrollMotion />
      <AnimatedBackground />
      <Navbar />

      <main className="page-shell">
        <Hero />
        <TechMarquee />
        <Projects />
        <About />


        <Skills />
        <Experience />
        <Education />
        <Certificates />
        <Stats />
        <SocialDeck />
        <Contact />
      </main>

      <Footer />
    </PremiumMotion>
  );
}




