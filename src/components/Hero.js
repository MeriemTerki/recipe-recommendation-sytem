import React from "react";
import HeroImg from "../assets/hero.png";

const Hero = () => {
  return (
    <div className="bg-white text-myBrown mb-[5%] ">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px] mx-[10%] ">
        {/* text section */}
        <div className="flex flex-col justify-center gap-8 text-center md:text-left pt-24 md:p-0 pb-10">
          <h1 className="text-3xl lg:text-5xl font-semibold ">
            Discover Recipes Tailored To Your Taste And Nutritional Goals
          </h1>
          <p className="">
            Input ingredients , apply filters , and get personalized recipe suggestions in seconds
          </p>
          <div className="flex gap-4 items-center md:justify-start justify-center">
          <button
              onClick={() => {
                document.getElementById("how-works").scrollIntoView({ behavior: "smooth" });
              }}
              className="primary-btn hover:scale-105 duration-200 border border-2 border-myBrown py-2 px-4 rounded-xl"
            >
              How it works
            </button>

            <button
              onClick={() => {
                document.getElementById("try-now").scrollIntoView({ behavior: "smooth" });
              }}
              className="secondary-btn text-myBrown hover:scale-105 duration-200 border border-2 border-myBrown py-2 px-4 rounded-xl"
            >
              Try now
            </button>

          </div>
        </div>
        {/* image section */}
        <div className="flex flex-col justify-center">
          <img
            src={HeroImg}
            alt=""
            className="animate-spin-slow img-shadow w-[400px] mx-auto "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;