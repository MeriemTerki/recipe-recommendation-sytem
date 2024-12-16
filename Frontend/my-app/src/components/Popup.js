import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

const Popup = ({ recipe, onClose }) => {
  const popupRef = useRef(null);

  if (!recipe) return null; // Return nothing if no recipe is selected

  const handleExportToPDF = () => {
    if (popupRef.current) {
      // Clone the content without buttons
      const contentClone = popupRef.current.cloneNode(true);
      const buttons = contentClone.querySelectorAll("button");
      buttons.forEach((button) => button.remove()); // Remove buttons from the cloned content

      const options = {
        margin: 1,
        filename: `${recipe.Name.replace(/\s+/g, "_")}_Recipe.pdf`, // Corrected: Use backticks for template literal
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(options).from(contentClone).save();
    }
  };

  const cleanInstructions = (input) => {
    if (!input || typeof input !== "string") return [];
    const match = input.match(/^c\((.*)\)$/);
    if (match) {
      return match[1]
        .split(/",\s?"/) // Splits on commas surrounded by optional spaces
        .map((item) => item.replace(/^"|"$|\\|\\n/g, "").trim()); // Removes leading/trailing quotes, escapes, and trims whitespace
    }
    return [];
  };

  const cleanIngredients = (ingredients) => {
    return ingredients
      .map((ingredient) =>
        ingredient
          .replace(/[^a-zA-Z\s]/g, "") // Removes all non-alphabetic characters except spaces
          .trim()
      )
      .filter((ingredient) => ingredient.length > 0); // Removes empty strings
  };

  const {
    Name,
    Images,
    AggregatedRating,
    RecipeServings,
    CookTime,
    RecipeInstructions,
    RecipeIngredientParts,
    RecipeIngredientQuantities,
  } = recipe;

  // Check if Images is a valid URL or a non-empty string
  const isValidImageUrl = (url) => {
    return typeof url === "string" && url.length > 0 && (url.startsWith("http") || url.startsWith("https"));
  };

  // If Images is invalid, fallback to the default image
  const imageUrl = isValidImageUrl(Images) ? Images : "default-image.jpg";

  // Clean and format the instructions
  const formattedInstructions = cleanInstructions(RecipeInstructions || "");

  // Clean and format the ingredients
  const cleanedIngredients = cleanIngredients(RecipeIngredientParts || []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden"
      >
        <div className="p-8 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="text-myBrown font-bold float-right"
          >
            ✕
          </button>
          <img
            src={imageUrl}
            alt={Name}
            className="w-72 mx-auto object-cover img-shadow mb-4"
          />
          <h2 className="text-3xl font-bold text-center mb-4">{Name}</h2>
          <p className="font-semibold ">Rating: {AggregatedRating || "N/A"}</p>
          <p className="font-semibold ">
            Number of servings: {RecipeServings || "N/A"}
          </p>
          <p className="font-semibold ">Duration: {CookTime} mins</p>

          <h3 className="text-xl font-bold mt-4">Ingredients:</h3>
          <ul className="list-disc pl-6">
            {cleanedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mt-4">Instructions:</h3>
          <ol className="list-decimal pl-6">
            {formattedInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>

          <div className="mt-6 text-center space-x-4">
            <button
              onClick={handleExportToPDF}
              className="px-4 py-2 text-white border border-2 border-myOrange bg-myOrange rounded-md shadow hover:bg-mySunset hover:border-mySunset"
            >
              Export to PDF
            </button>
            <button
              onClick={onClose}
              className="border border-2 border-myBrown py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
