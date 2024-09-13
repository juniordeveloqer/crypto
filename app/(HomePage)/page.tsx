"use client";

import HeroSection from "./(ui)/hero";
import CarouselSection from "./(ui)/CarouselSection"

const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-black h-lvh">
      <HeroSection />
    <CarouselSection />
    </section>
  );
};

export default HomePage;
