import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import OpportunitiesSpotlightSection from "@/components/sections/OpportunitiesSpotlightSection";
import AboutSection from "@/components/sections/AboutSection";
import PastEventsGallery from "@/components/sections/PastEventsGallery";
import SpeakersSection from "@/components/sections/SpeakersSection";
import WhoShouldAttendSection from "@/components/sections/WhoShouldAttendSection";
import ProgrammeSection from "@/components/sections/ProgrammeSection";
import CtaSection from "@/components/sections/CtaSection";
import PartnersSection from "@/components/sections/PartnersSection";
import FaqSection from "@/components/sections/FaqSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* A, Hero */}
        <HeroSection />

        {/* D, Summit agenda + overview panel */}
        <ProgrammeSection />

        {/* C2, Opportunities card (floats at Programme/About boundary) */}
        <OpportunitiesSpotlightSection />

        {/* G, About (negative margin slides its background behind the card) */}
        <div className="-mt-[120px]">
          <AboutSection />
        </div>

        {/* H, Past events gallery */}
        <PastEventsGallery />

        {/* I, Speakers */}
        <SpeakersSection />

        {/* L, Who should attend */}
        <WhoShouldAttendSection />

        {/* N, Partners */}
        <PartnersSection />

        {/* FAQ */}
        <FaqSection />

        {/* M, CTA */}
        <CtaSection />

      </main>
      <Footer />
    </>
  );
}
