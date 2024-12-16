
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import RecipeForm from "./components/Form";
import Recipes from "./components/Recipes";
import Footer from "./components/Footer";

const App = () => {
  // const [recipes, setRecipes] = useState([]);

  // const fetchRecommendedRecipes = async (formData) => {
  //   const { selectedIngredients, ...filters } = formData;

  //   const params = new URLSearchParams({
  //     selected_ingredients: selectedIngredients.map((item) => item.value),
  //     ...filters,
  //   });

  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/recommend_recipes?${params}`
  //     );
  //     if (!response.ok) throw new Error("Failed to fetch recipes");
  //     const data = await response.json();
      
  //     // Update the recipes state with the recommended recipes
  //     setRecipes(data.recommended_recipes);  // Updated here
  //   } catch (error) {
  //     console.error("Error fetching recipes:", error.message);
  //   }
  // };

  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <RecipeForm  />
      
      <Footer />
    </div>
  );
};
export default App ; 