import Hero from "@/components/Hero";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <div className="w-full mt-16 md:mt-20 lg:mt-24">
        <MainContent />
      </div>
      <div className="w-full mt-16 md:mt-20 lg:mt-24">
        <Footer />
      </div>
    </div>
  );
}
