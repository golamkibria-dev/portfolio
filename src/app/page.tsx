import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { FaqNewsletter } from "@/components/sections/faq-newsletter";
import { GithubStats } from "@/components/sections/github-stats";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Separator className="section-container" />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <GithubStats />
      <FaqNewsletter />
      <Contact />
    </>
  );
}
