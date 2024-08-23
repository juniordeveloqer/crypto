"use client";

import HeroSection from "./(ui)/hero";

const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-black h-lvh">
      <HeroSection />
    </section>
  );
};

export default HomePage;
