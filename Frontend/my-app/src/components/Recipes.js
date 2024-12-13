import React, { useState } from "react";
import Image1 from "../assets/tomato.png";
import Popup from "./Popup";

const RecipeData = [
  {
    name: "Gold Card",
    raring: "5",
    image: Image1,
    link: "#",
    description: "Monthly access to fitness area.",
    cooktime: "25min",
    recipeServings: "12",
    additionalInfo: "This card gives you exclusive access to premium recipes.",
  },
  {
    name: "Gold Card",
    raring: "5",
    image: Image1,
    link: "#",
    description: "Monthly access to fitness area.",
    cooktime: "25min",
    recipeServings: "12",
    additionalInfo: "Ideal for advanced home cooks.",
  },
  {
    name: "Gold Card",
    raring: "5",
    image: Image1,
    link: "#",
    description: "Monthly access to fitness area.",
    cooktime: "25min",
    recipeServings: "12",
    additionalInfo: "Includes exclusive tips and tricks.",
  },
];

const Recipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClosePopup = () => {
    setSelectedRecipe(null);
  };

  return (
    <div  className='my-10' >
      <span ></span>
      <div className="py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1 className="text-3xl font-bold text-center sm:text-4xl">
              The Recipes Recommended For You
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {RecipeData.map((recipe) => (
              <div
                key={recipe.name}
                onClick={() => handleCardClick(recipe)}
                className="card text-center space-y-3 sm:space-y-6 p-4 sm:py-16 bg-myWhite hover:bg-primary/20 duration-300 rounded-lg group cursor-pointer"
              >
                <img
                  src={recipe.image}
                  alt="#"
                  className="w-60 w-50 mx-auto object-cover img-shadow"
                />
                <h1 className="text-3xl font-bold">{recipe.name}</h1>
                <p className="font-semibold ">Rating: {recipe.raring}</p>
                <p className="font-semibold ">
                  Number of servings: {recipe.recipeServings}
                </p>
                <p className="font-semibold ">Description: {recipe.description}</p>
                <p className="font-semibold ">Duration: {recipe.cooktime}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button 
      className="mx-[43%] px-4 py-2 text-white order border-2 border-myOrange bg-myOrange rounded-md shadow hover:bg-mySunset hover:border-mySunset">
        Recommended again 
      </button>

      {/* Popup Component */}
      <Popup recipe={selectedRecipe} onClose={handleClosePopup} />
      </div>
  );
};

export default Recipes;
