// src/App.tsx
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/effects/Preloader";
import ScrollProgress from "./components/effects/ScrollProgress";
import SmoothScroll from "./components/effects/SmoothScroll";
import Cursor from "./components/effects/Cursor";
import SnowBackground from "./components/three/SnowBackground";
import { useCardSpotlight } from "./hooks/useCardSpotlight";

function App() {
  useCardSpotlight();
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>
      <SmoothScroll />
      <Preloader />
      <SnowBackground />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <div className="relative z-10">
        <main id="main-content" tabIndex={-1}>
          <Home />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
