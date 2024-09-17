"use client";

import HeroSection from "./(ui)/hero";
import CarouselSection from "./(ui)/CarouselSection"
import WhyCold from "./(ui)/WhyCold"


const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-black h-lvh">
      <HeroSection />
    <CarouselSection />
    <WhyCold/>
    </section>
  );
};

export default HomePage;
