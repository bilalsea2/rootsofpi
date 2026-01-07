import ShaderBackground from "@/components/ShaderBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ScrollingGallery from "@/components/ScrollingGallery";
import Contact from "@/components/Contact";
import SudokuFooter from "@/components/SudokuFooter";

export default function Home() {
  return (
    <>
      <ShaderBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <section id="events">
          <ScrollingGallery />
        </section>
        <Contact />
      </main>
      <SudokuFooter />
    </>
  );
}
