import React, { useState } from "react";
import Popup from "./Popup";

const Recipes = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClosePopup = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="my-10">
      <div className="container mx-auto">
  <h1 className="text-3xl font-bold text-center mb-8">
    The Recipes Recommended For You
  </h1>

  {recipes.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.RecipeId}
          onClick={() => handleCardClick(recipe)}
          className="card p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <img
            src={recipe.Images !== "character(0)" ? recipe.Images : "default-image.jpg"}
            alt={recipe.Name}
            className="w-full h-40 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-semibold">{recipe.Name}</h2>
          <p>Author: {recipe.AuthorName || "Unknown"}</p>
          <p>Rating: {recipe.AggregatedRating || "N/A"}</p>
          <p>Servings: {recipe.RecipeServings || "N/A"}</p>
          <p>Cook Time: {recipe.CookTime} mins</p>
          
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">No recipes found. Try adjusting your criteria.</p>
  )}
</div>

      {selectedRecipe && (
        <Popup recipe={selectedRecipe} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Recipes;
 