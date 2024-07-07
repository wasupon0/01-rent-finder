import heroBg from "@/assets/images/hero-bg.svg";
import logoIcon from "@/assets/images/logo-icon.svg";
import skyBg from "@/assets/images/sky-bg.svg";
import React from "react";

import PropertySearchForm from "./PropertySearchForm";

const Hero = () => {
  const style = {
    backgroundImage: `url(${heroBg.src})`,
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "left",
  };

  // const style = {
  //   background: `url(${heroBg.src}) no-repeat right / cover`,
  // };

  return (
    /* <!-- Hero --> */
    <section className="py-20 mb-4 bg-orange-400" style={style}>
      <div className="flex flex-col items-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            Simplifying Apartment Searches
          </h1>
          <p className="my-4 text-xl text-white">
            Explore apartments that match your unique preferences
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>
  );
};

export default Hero;
