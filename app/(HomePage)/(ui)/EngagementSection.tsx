// components/ClaimYourSpotSection.tsx
import React from "react";
import Image from "next/image";
import usersImage from "@/public/images/debate.png";
import offersImage from "@/public/images/fireside.png";
import trackImage from "@/public/images/andreas.png";

const ClaimYourSpotSection = () => {
  return (
    <section className="py-12 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:items-start lg:gap-10">
          {/* Left Side - Content Wrapper */}
          <div className="flex-1 lg:sticky lg:top-24 pt-[10%] pb-[5%]">
            <h3
              className="text-3xl font-bold text-white"
              id="claim-your-spot-title"
            >
              Claim Your Spot in Crypto
            </h3>
            <p className="mt-4 text-lg text-white">
              Join the revolution and start earning rewards by becoming part of
              our crypto community today.
            </p>
            <div className="relative inline-block">
              <button>Click Me</button>
            </div>
          </div>
          {/* Right Side - Image Gallery */}
          <div className="grid grid-cols-1 gap-36 mt-6 lg:mt-0 lg:grid-cols-1">
            <div className="w-full justify-end flex">
              <Image
                src={usersImage}
                loading="lazy"
                alt="20 Million Users"
                width={400}
                height={300}
                className="w-[80%] h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="w-full justify-end flex">
              <Image
                src={offersImage}
                loading="lazy"
                alt="300 Plus Offers"
                width={400}
                height={300}
                className="w-[80%] h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="w-full justify-end flex">
              <Image
                src={trackImage}
                loading="lazy"
                alt="From Track to Webb"
                width={400}
                height={300}
                className="w-[80%] h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClaimYourSpotSection;
