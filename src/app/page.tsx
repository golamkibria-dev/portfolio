import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Certificates } from "@/components/sections/certificates";
import { Services } from "@/components/sections/services";
import { GithubStats } from "@/components/sections/github-stats";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqNewsletter } from "@/components/sections/faq-newsletter";
import { Contact } from "@/components/sections/contact";
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
      <Certificates />
      <Services />
      <GithubStats />
      <Testimonials />
      <FaqNewsletter />
      <Contact />
    </>
  );
}
