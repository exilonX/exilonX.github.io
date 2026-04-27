import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Clients } from "./components/Clients";
import { Projects } from "./components/Projects";
import { CaseStudies } from "./components/CaseStudies";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CaseStudyDiploma } from "./pages/CaseStudyDiploma";
import { CaseStudyCryptobot } from "./pages/CaseStudyCryptobot";

type Route =
  | { type: "home" }
  | { type: "case-study"; slug: string };

function getRoute(): Route {
  const match = window.location.hash.match(/^#\/case-study\/(.+)$/);
  if (match) return { type: "case-study", slug: match[1] };
  return { type: "home" };
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const handler = () => setRoute(getRoute());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (route.type === "case-study") {
    if (route.slug === "diploma-project") return <CaseStudyDiploma />;
    if (route.slug === "cryptobot") return <CaseStudyCryptobot />;
  }

  return (
    <div className="min-h-screen bg-bg text-text transition-colors">
      <Nav />
      <Hero />
      <Experience />
      <Projects />
      <CaseStudies />
      <Skills />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
