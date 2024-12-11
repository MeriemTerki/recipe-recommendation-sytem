import React, { useState, useEffect } from "react";
import Select from "react-select";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([]);
  const [formData, setFormData] = useState({
    selectedIngredients: [],
    carbs: "none",
    fat: "none",
    sugar: "none",
    protein: "none",
    cholesterol: "none",
    fiber: "none",
    //calories: "",
    cookTime: "",
  });

//   // Fetch ingredients from the database
//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const response = await fetch("/api/ingredients"); // Replace with your API endpoint
//         const data = await response.json();
//         const formattedIngredients = data.map((ingredient) => ({
//           value: ingredient.id,
//           label: ingredient.name,
//         }));
//         setIngredients(formattedIngredients);
//       } catch (error) {
//         console.error("Error fetching ingredients:", error);
//       }
//     };

//     fetchIngredients();
//   }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const levels = ["none", "low", "medium", "high"];

  return (
    <div id='try-now' className="mx-[10%]">
        <h2 className="text-myBrown text-4xl font-semibold text-center  mx-[15%] mt-[10%] mb-[3%]">
            Get your recommended recipe now
        </h2>
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-[3%] my-5 bg-white shadow-md rounded-md border border-myBrown border-2 "
    >
      <div className="mb-4">
        <label htmlFor="selectedIngredients" className="block mb-2 text-m font-semibold  text-myBrown">
          Ingredients (Select up to 3)
        </label>
        <Select
          isMulti
          name="selectedIngredients"
          options={ingredients}
          className="basic-multi-select"
          classNamePrefix="select"
          value={formData.selectedIngredients}
          onChange={handleMultiSelectChange}
          isOptionDisabled={() => formData.selectedIngredients.length >= 3} // Limit selection to 3
        />
      </div>

      {["carbs", "fat", "sugar", "protein", "cholesterol", "fiber"].map((field) => (
        <div className="mb-4" key={field}>
          <label htmlFor={field} className="block mb-2 text-m font-semibold font-medium text-myBrown">
            {field.charAt(0).toUpperCase() + field.slice(1)}
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
      ))}

      {/* <div className="mb-4">
        <label htmlFor="calories" className="block mb-2 text-sm font-medium text-myBrown">
          Calories
        </label>
        <input
          type="number"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
      </div> */}

      <div className="mb-4">
        <label htmlFor="cookTime" className="block mb-2 text-m font-semibold font-medium text-myBrown">
          Cook Time
        </label>
        <input
          type="time"
          name="cookTime"
          value={formData.cookTime}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-myOrange rounded-md shadow hover:bg-mySunset"
      >
        Submit
      </button>
    </form></div>
  );
};

export default RecipeForm;
