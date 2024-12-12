from fastapi import FastAPI, Query
from typing import List, Optional
from utils import recommend_recipes, recommend_ingredients, filter_recipes_by_nutrition

app = FastAPI()

@app.get("/filter_recipes")
def filter_recipes(fat_content: Optional[str] = None,
                    cholesterol_content: Optional[str] = None,
                    carbohydrate_content: Optional[str] = None,
                    fiber_content: Optional[str] = None,
                    sugar_content: Optional[str] = None,
                    protein_content: Optional[str] = None,
                    cook_time: Optional[int] = None):
    """
    Endpoint to filter recipes based on nutritional content and cook time.
    """
    filtered_recipes = filter_recipes_by_nutrition(
        fat_content=fat_content, cholesterol_content=cholesterol_content,
        carbohydrate_content=carbohydrate_content, fiber_content=fiber_content,
        sugar_content=sugar_content, protein_content=protein_content,
        cook_time=cook_time
    )
    return filtered_recipes[["RecipeId", "Name", "CookTime", "Description"]].to_dict(orient="records")

@app.get("/recommend_ingredients")
def get_recommended_ingredients(selected_ingredients: List[str] = Query(...),
                                fat_content: Optional[str] = None,
                                cholesterol_content: Optional[str] = None,
                                carbohydrate_content: Optional[str] = None,
                                fiber_content: Optional[str] = None,
                                sugar_content: Optional[str] = None,
                                protein_content: Optional[str] = None,
                                cook_time: Optional[int] = None):
    """
    Endpoint to recommend additional ingredients based on selected ingredients.
    """
    recommendations = recommend_ingredients(
        selected_ingredients, fat_content=fat_content, cholesterol_content=cholesterol_content,
        carbohydrate_content=carbohydrate_content, fiber_content=fiber_content,
        sugar_content=sugar_content, protein_content=protein_content, cook_time=cook_time
    )
    return recommendations

@app.get("/recommend_recipes")
def get_recommended_recipes(selected_ingredients: List[str] = Query(...),
                             confidence_threshold: float = 0.45, max_recipes: int = 5,
                             fat_content: Optional[str] = None,
                             cholesterol_content: Optional[str] = None,
                             carbohydrate_content: Optional[str] = None,
                             fiber_content: Optional[str] = None,
                             sugar_content: Optional[str] = None,
                             protein_content: Optional[str] = None,
                             cook_time: Optional[int] = None):
    """
    Endpoint to recommend recipes based on selected ingredients and additional recommendations.
    """
    recommended_recipes = recommend_recipes(
        selected_ingredients, confidence_threshold, max_recipes,
        fat_content=fat_content, cholesterol_content=cholesterol_content,
        carbohydrate_content=carbohydrate_content, fiber_content=fiber_content,
        sugar_content=sugar_content, protein_content=protein_content,
        cook_time=cook_time
    )
    return recommended_recipes

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
