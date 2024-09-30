

import React from 'react'
import nft from '@/public/images/nft.svg'
import Image from 'next/image'
const DiscoverNfts = () => {
  return (
    <section className="bg-black py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
  
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={nft} 
            alt="NFT"
           
            className="rounded-lg object-cover"
          />
        </div>
        <div className="text-white max-w-lg mb-8 lg:mb-0 lg:text-left lg:mr-44">
          <h1 className="text-4xl  lg:text-5xl font-light mb-4">
            Discover, collect, and sell <br /> extraordinary NFTs
          </h1>
          <p className=" mb-6">
            Lorem ipsum dolor sit amet<br/>consectetur adipiscing elit<br/> sed do
            eiusmod tempor incididunt.
          </p>
          <button className="bg-[#55A96D] hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-8">
            Buy NFTs
          </button>
        </div>

 
   
      </div>
    </section>
  )
}

export default DiscoverNfts