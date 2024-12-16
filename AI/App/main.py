from fastapi import FastAPI, Query
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from utils import recommend_recipes, recommend_ingredients, filter_recipes_by_nutrition

# Create the FastAPI instance
app = FastAPI()

# Define allowed origins for CORS
origins = [
    "http://localhost:3000",  # React frontend URL
]

# Add CORS middleware to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from the React app
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # Allow both GET and POST methods
    allow_headers=["*"],  # Allow all headers
)

# Endpoint to recommend recipes based on selected ingredients and nutritional filters
@app.get("/recommend_recipes")
def get_recommended_recipes(
    selectedIngredients: List[str] = Query(..., alias="selectedIngredients"),  # Ensure alias is used for the query parameter
    confidence_threshold: float = 0.45,
    max_recipes: int = 5,
    fat_content: Optional[str] = None,
    cholesterol_content: Optional[str] = None,
    carbohydrate_content: Optional[str] = None,
    fiber_content: Optional[str] = None,
    sugar_content: Optional[str] = None,
    protein_content: Optional[str] = None,
    cook_time: Optional[int] = None
):
    # Debug log to print the received parameters
    print("Received query parameters:")
    print(f"selectedIngredients: {selectedIngredients}")
    print(f"confidence_threshold: {confidence_threshold}")
    print(f"max_recipes: {max_recipes}")
    print(f"fat_content: {fat_content}")
    print(f"cholesterol_content: {cholesterol_content}")
    print(f"carbohydrate_content: {carbohydrate_content}")
    print(f"fiber_content: {fiber_content}")
    print(f"sugar_content: {sugar_content}")
    print(f"protein_content: {protein_content}")
    print(f"cook_time: {cook_time}")

    # Handle recipe recommendation logic here
    recommended_recipes = recommend_recipes(
        selectedIngredients, confidence_threshold, max_recipes,
        fat_content=fat_content, cholesterol_content=cholesterol_content,
        carbohydrate_content=carbohydrate_content, fiber_content=fiber_content,
        sugar_content=sugar_content, protein_content=protein_content,
        cook_time=cook_time
    )

    return {
        "parameters": {
            "selectedIngredients": selectedIngredients,
            "confidence_threshold": confidence_threshold,
            "max_recipes": max_recipes,
            "fat_content": fat_content,
            "cholesterol_content": cholesterol_content,
            "carbohydrate_content": carbohydrate_content,
            "fiber_content": fiber_content,
            "sugar_content": sugar_content,
            "protein_content": protein_content,
            "cook_time": cook_time,
        },
        "recommended_recipes": recommended_recipes
    }

# Run the application with uvicorn (This is typically done in terminal, but included here for clarity)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)