import About from "@/components/About";
import AnimatedBackground from "@/components/AnimatedBackground";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import CursorGlow from "@/components/CursorGlow";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <CursorGlow />
      <Navbar />

      <main className="page-shell">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Stats />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
