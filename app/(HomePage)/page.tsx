

import HeroSection from "./(ui)/hero";
import CarouselSection from "./(ui)/carouselsection"
import WhyCold from "./(ui)/whycold"
import DiscoverNfts from "./(ui)/discovernfts";


const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-black ">
      <HeroSection  />
    <CarouselSection />
    <WhyCold/>
    <DiscoverNfts/>
    </section>
  );
};

export default HomePage;
