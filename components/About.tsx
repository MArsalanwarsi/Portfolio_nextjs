import { siteConfig } from "@/data/portfolio";

export default function About() {
  return <section id="about" data-surface="dark" className="profile-note">
    <h2>About</h2>
    <div><p>I’m <span data-copyable>{siteConfig.name}</span>, a full-stack developer based in Karachi. I build custom websites and e-commerce applications.</p>
      <p>{siteConfig.intro}</p></div>
  </section>;
}
