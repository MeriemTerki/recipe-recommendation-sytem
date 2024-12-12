import React, { useState } from "react";
import { IoMdTime } from "react-icons/io";


const RecipeCard = ({ recipe, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`group relative w-60 h-60 bg-white shadow-md rounded-lg overflow-hidden hover:h-auto transition-all duration-300 cursor-pointer ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
    >
      {/* Card Content */}
      <div className="p-4">
        <img
          src={recipe.image}
          alt="recipe"
          className="w-full h-32 object-cover rounded-md mb-2"
        />
        <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
        
        
        <div className="flex items-center mx-[30%] ">
            <IoMdTime className="w-[20%] h-[20%]" />
            <span className="text-sm text-black-500 mx-2">{recipe.cookingTime}</span>
         
        </div>
      </div>

      {/* Additional Information */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-100 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-sm mb-1">Calories: {recipe.calories}</p>
        <p className="text-sm mb-1">Carbs: {recipe.carbs}</p>
        <p className="text-sm mb-1">Fiber: {recipe.fiber}</p>
        <p className="text-sm mb-1">Sugar: {recipe.sugar}</p>
        <p className="text-sm mb-1">Protein: {recipe.protein}</p>
        <p className="text-sm mb-1">Cholesterol: {recipe.cholesterol}</p>
        <p className="text-sm mb-1">Fat: {recipe.fat}</p>
      </div>
    </div>
  );
};

const RecipePage = () => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  // Sample data for recipes
  const recipes = Array(10).fill({
    title: "Recipe Title",
    image: "https://via.placeholder.com/150",
    
    cookingTime: "30 mins",
    calories: "200",
    carbs: "30g",
    fiber: "5g",
    sugar: "10g",
    protein: "15g",
    cholesterol: "30mg",
    fat: "20g",
  });

  const handleCardSelect = (index) => {
    setSelectedRecipes((prevSelectedRecipes) => {
      if (prevSelectedRecipes.includes(index)) {
        // If the recipe is already selected, remove it
        return prevSelectedRecipes.filter((i) => i !== index);
      } else {
        // Otherwise, add it to the selection
        return [...prevSelectedRecipes, index];
      }
    });
  };

  const handleNext = () => {
    if (selectedRecipes.length > 0) {
      selectedRecipes.forEach((index) => {
        console.log("Selected Recipe:", recipes[index]);
      });
      alert(`You selected ${selectedRecipes.length} recipes`);
    } else {
      alert("Please select at least one recipe!");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Choose Recipes</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            isSelected={selectedRecipes.includes(index)}
            onSelect={() => handleCardSelect(index)}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setSelectedRecipes([])}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          More
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
