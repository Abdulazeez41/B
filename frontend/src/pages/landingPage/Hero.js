/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

import heroBackgroundImage from "../../assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <img src={heroBackgroundImage} alt="Hero" className="w-full" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-white text-2xl lg:text-4xl font-bold leading-tight md:leading-snug">
          Unlock the future of NFT events with Bpass where decentralization
          meets unforgettable experiences!
        </h1>
        <p className="text-white mt-4">
          Bpass is the first and best Web3 event management system
        </p>
        <div className="flex space-x-4 mt-8">
          <Link to={'/gallery'}>
            <button className="bg-[#F5167E] hover:bg-pink-700  text-white px-8 py-4 rounded-full">
              Get Ticket
            </button>
          </Link>
          <a href="#">
            <button className="bg-purple-600 hover:bg-purple-900 bg-opacity-10 ring-1 ring-white text-white px-8 py-4 rounded-full">
              Learn More
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
