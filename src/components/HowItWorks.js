import React from 'react'

import Image1 from '../assets/tomato.png'
import Image2 from '../assets/form-icon.png'
import Image3 from '../assets/howitworks-icon3.png'

const HowItWorks = () => {
    const StepsData= [
        {
          image: Image1,
         
          desc: "To begin, you will need to carefully input the ingredients you have on hand .",
        },
        {
          image: Image2,
          
          desc: "After entering your ingredients, you can proceed to apply the filters that align with your specific nutritional goals and personal preferences.",
        },
        {
          image: Image3,
          
          desc: "Finally, click Generate to view a selection of recipes that perfectly match your search criteria and preferences.",
        },
      ];


  return (
    <div id="how-works" className="container py-14 mx-[6%] my-[5 %]">
      {/* header section */}
      <div className="text-center mb-[8%]">
        <h1 className="text-4xl font-semibold">How It Works</h1>
        
      </div>
      {/* card section */}
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8 ">
       
          <div className="bg-myWhite p-5 lg:p-6 rounded-3xl hover:scale-110 transition duration-300 "  >
            <img
              src={Image1}
              alt=""
              className="w-60 sm:w-40  lg:w-[240px] mx-auto object-cover img-shadow"
            />
            <div className="space-y-2 text-m lg:text-xl text-center font-semibold">
                <p>Input the ingredients </p>
              
            </div>
          </div>
          <div className="bg-myWhite p-5 lg:p-6 rounded-3xl hover:scale-110 transition duration-300 "  >
            <img
              src={Image2}
              alt=""
              className="w-20 sm:w-20 m-10 lg:w-[140px] mx-auto object-cover img-shadow"
            />
            <div className="space-y-2 text-m lg:text-xl text-center font-semibold">
                <p>Apply the filters </p>
              
            </div>
          </div>
          <div className="bg-myWhite p-5 lg:p-6 rounded-3xl hover:scale-110 transition duration-300 "  >
            <img
              src={Image3}
              alt=""
              className="w-60 sm:w-40  lg:w-[240px] mx-auto object-cover img-shadow"
            />
            <div className="space-y-2 text-m lg:text-xl text-center font-semibold">
                <p>Get your recommended recipes</p>
              
            </div>
          </div>
        
      </div>
    </div>
  )
}

export default HowItWorks
