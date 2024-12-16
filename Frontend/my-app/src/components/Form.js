import React, { useState, useEffect } from "react";
import Select from "react-select";
import ingredientsData from "../ingredients.json";
import Recipes from "./Recipes";

const Form = ({ onFetchRecipes }) => {
  const [ingredients, setIngredients] = useState([]);
  const [formData, setFormData] = useState({
    selectedIngredients: [],
    carbs: "",
    fat: "",
    sugar: "",
    protein: "",
    cholesterol: "",
    fiber: "",
    cookTime: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]); // State to hold recipes

  // Load ingredients options from JSON file
  useEffect(() => {
    const formattedIngredients = ingredientsData.map((ingredient) => ({
      value: ingredient.value,
      label: ingredient.label,
    }));
    setIngredients(formattedIngredients);
  }, []);

  const handleMultiSelectChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      selectedIngredients: selectedOptions || [],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.selectedIngredients.length === 0) {
      setError("Please select at least one ingredient.");
      return;
    }

    setError(null);
    setLoading(true);

    const params = new URLSearchParams();
    formData.selectedIngredients.forEach((item) => {
      params.append("selectedIngredients", item.value);
    });

    if (formData.carbs) params.append("carbohydrate_content", formData.carbs);
    if (formData.fat) params.append("fat_content", formData.fat);
    if (formData.sugar) params.append("sugar_content", formData.sugar);
    if (formData.protein) params.append("protein_content", formData.protein);
    if (formData.cholesterol)
      params.append("cholesterol_content", formData.cholesterol);
    if (formData.fiber) params.append("fiber_content", formData.fiber);
    if (formData.cookTime) params.append("cook_time", formData.cookTime);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommend_recipes?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
      }

      const data = await response.json();
      setRecipes(data.recommended_recipes); // Update recipes state
      onFetchRecipes(data.recommended_recipes);
    } catch (err) {
      setError("");
    } finally {
      setLoading(false);
    }
  };

  

  const levels = ["zero", "low", "medium", "high"];

  return (
    <div id="try-now" className="mx-[10%]">
      <h2 className="text-myBrown text-4xl font-semibold text-center mx-[15%] mt-[10%] mb-[3%]">
        Get your recommended recipe now
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-[3%] my-5 bg-white shadow-md rounded-md border border-myBrown border-2"
      >
        

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-myBrown">
            Ingredients (Select up to 3)
          </label>
          <Select
            isMulti
            name="selectedIngredients"
            options={ingredients}
            value={formData.selectedIngredients}
            onChange={handleMultiSelectChange}
            isOptionDisabled={() => formData.selectedIngredients.length >= 3}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {["carbs", "fat", "sugar", "protein", "cholesterol", "fiber"].map(
          (field) => (
            <div className="mb-4" key={field}>
              <label className="block mb-2 font-semibold text-myBrown">
                {field.charAt(0).toUpperCase() + field.slice(1)} Level
              </label>
              <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )
        )}

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-myBrown">
            Cook Time (in minutes)
          </label>
          <input
            type="number"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            min="1"
            placeholder="Enter cook time (optional)"
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-myOrange rounded-md hover:bg-mySunset"
        >
          Submit
        </button>
      </form>

       {/* Render the recipes
       <div className="mt-8">
        <h3 className="text-2xl font-bold text-myBrown mb-4">
          Recommended Recipes
        </h3>
        {recipes.length === 0 && <p>No recipes to display yet.</p>}
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index} className="mb-4 border-b pb-4">
              <h4 className="text-xl font-semibold">{recipe.Name}</h4>
              <p><strong>Description:</strong> {recipe.Description}</p>
              <p><strong>Author:</strong> {recipe.AuthorName}</p>
              <p><strong>Cook Time:</strong> {recipe.CookTime} minutes</p>
              <p><strong>Rating:</strong> {recipe.AggregatedRating} (based on {recipe.ReviewCount} reviews)</p>
            </li>
          ))}
        </ul>
      </div> */}
      <Recipes recipes={recipes}/>

    </div>
  );
};

export default Form;
