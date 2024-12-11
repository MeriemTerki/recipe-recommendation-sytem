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
        filename: `${recipe.name.replace(" ", "_")}_Recipe.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(options).from(contentClone).save();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full"
      >
        <button
          onClick={onClose}
          className="text-myBrown font-bold float-right"
        >
          ✕
        </button>
        <img
          src={recipe.image}
          alt="#"
          className="w-72 mx-auto object-cover img-shadow mb-4"
        />
        <h2 className="text-3xl font-bold text-center mb-4">{recipe.name}</h2>
        <p className="font-semibold ">Rating: {recipe.raring}</p>
        <p className="font-semibold ">
          Number of servings: {recipe.recipeServings}
        </p>
        <p className="font-semibold ">Description: {recipe.description}</p>
        <p className="font-semibold ">Duration: {recipe.cooktime}</p>
        <p className="font-semibold ">Additional Info: {recipe.additionalInfo}</p>

        <div className="mt-6 text-center space-x-4">
          <button
            onClick={handleExportToPDF}
            className=" px-4 py-2 text-white order border-2 border-myOrange bg-myOrange rounded-md shadow hover:bg-mySunset hover:border-mySunset"
          >
            Export to PDF
          </button>
          <button
            onClick={onClose}
             className="  border border-2 border-myBrown py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
