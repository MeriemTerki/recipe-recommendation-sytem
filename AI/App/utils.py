import pandas as pd
import ast
from mlxtend.frequent_patterns import fpgrowth, association_rules
from mlxtend.preprocessing import TransactionEncoder
from scipy.sparse import csr_matrix

# Path to the cleaned dataset
DATA_PATH = r"C:\Users\mrmte\Documents\2CS_IASD\ML\ML_mini_projet\mini-project-ml\data\cleaned_recipes.csv"

BATCH_SIZE = 50000  # Number of rows per batch

def load_and_preprocess_data():
    """
    Load and preprocess the dataset.
    """
    diet_data = pd.read_csv(DATA_PATH)
    # Convert 'RecipeIngredientParts' back to list
    diet_data["RecipeIngredientParts"] = diet_data["RecipeIngredientParts"].apply(ast.literal_eval)
    return diet_data

def filter_recipes_by_nutrition(fat_content=None, cholesterol_content=None, carbohydrate_content=None,
                                fiber_content=None, sugar_content=None, protein_content=None, cook_time=None):
    """
    Filter the dataset based on selected nutrition content and cook time.
    """
    diet_data = load_and_preprocess_data()

    if fat_content:
        diet_data = diet_data[diet_data['FatContent'] == fat_content]
    if cholesterol_content:
        diet_data = diet_data[diet_data['CholesterolContent'] == cholesterol_content]
    if carbohydrate_content:
        diet_data = diet_data[diet_data['CarbohydrateContent'] == carbohydrate_content]
    if fiber_content:
        diet_data = diet_data[diet_data['FiberContent'] == fiber_content]
    if sugar_content:
        diet_data = diet_data[diet_data['SugarContent'] == sugar_content]
    if protein_content:
        diet_data = diet_data[diet_data['ProteinContent'] == protein_content]
    if cook_time:
        diet_data = diet_data[diet_data['CookTime'] <= cook_time]

    return diet_data

def process_batch(batch_data, te, min_support):
    """
    Process a batch of data to generate frequent itemsets.
    """
    transactions = batch_data["RecipeIngredientParts"].tolist()

    # Encode transactions using TransactionEncoder
    ingredient_matrix = te.fit_transform(transactions)

    # Convert to sparse matrix
    ingredient_sparse = csr_matrix(ingredient_matrix)

    # Convert sparse matrix to DataFrame
    ingredient_df = pd.DataFrame.sparse.from_spmatrix(ingredient_sparse, columns=te.columns_)

    # Generate frequent itemsets using fpgrowth
    frequent_itemsets = fpgrowth(ingredient_df, min_support=min_support, use_colnames=True)
    return frequent_itemsets

def generate_association_rules(min_support=0.01, min_confidence=0.3, **filter_kwargs):
    """
    Generate association rules by processing data in batches.
    Apply filters to the data before generating the rules.
    """
    # Filter the dataset based on provided criteria
    diet_data = filter_recipes_by_nutrition(**filter_kwargs)

    te = TransactionEncoder()
    all_frequent_itemsets = []

    # Process the data in batches
    for start_idx in range(0, len(diet_data), BATCH_SIZE):
        batch_data = diet_data.iloc[start_idx:start_idx + BATCH_SIZE]
        frequent_itemsets = process_batch(batch_data, te, min_support)
        all_frequent_itemsets.append(frequent_itemsets)

    # Combine frequent itemsets from all batches
    all_frequent_itemsets = pd.concat(all_frequent_itemsets, ignore_index=True).drop_duplicates()

    # Generate association rules
    rules = association_rules(all_frequent_itemsets, metric="confidence", min_threshold=min_confidence, num_itemsets=len(frequent_itemsets))

    # Convert antecedents and consequents to lists for easier processing
    rules["antecedents"] = rules["antecedents"].apply(lambda x: list(x))
    rules["consequents"] = rules["consequents"].apply(lambda x: list(x))

    return rules

def recommend_ingredients(selected_ingredients, **filter_kwargs):
    """
    Recommend additional ingredients based on selected ones.
    """
    rules = generate_association_rules(**filter_kwargs)

    matched_rules = rules[rules["antecedents"].apply(lambda x: set(selected_ingredients).issubset(set(x)))]
    if matched_rules.empty:
        return []

    recommendations = matched_rules[["consequents", "confidence"]]
    recommendations = recommendations.explode("consequents").groupby("consequents").mean().reset_index()
    recommendations = recommendations.sort_values(by="confidence", ascending=False)

    return recommendations.to_dict(orient="records")

def recommend_recipes(selected_ingredients, confidence_threshold=0.45, max_recipes=5, **filter_kwargs):
    """
    Recommend recipes based on selected ingredients and additional recommendations with confidence > confidence_threshold,
    limiting the number of recommended recipes to max_recipes.
    """
    # Print the parameters for debugging
    print("Parameters:")
    print(f"Selected Ingredients: {selected_ingredients}")
    print(f"Confidence Threshold: {confidence_threshold}")
    print(f"Max Recipes: {max_recipes}")
    print(f"Filter Criteria: {filter_kwargs}")

    # Step 1: Filter recipes based on nutritional content and other criteria
    diet_data = filter_recipes_by_nutrition(**filter_kwargs)

    # Step 2: Get ingredient recommendations
    ingredient_recommendations = recommend_ingredients(selected_ingredients, **filter_kwargs)

    # Step 3: Filter recommended ingredients with confidence > threshold
    high_confidence_ingredients = [
        item["consequents"] for item in ingredient_recommendations if item["confidence"] > confidence_threshold
    ]

    # Flatten the list of high-confidence ingredients
    additional_ingredients = [ingredient for sublist in high_confidence_ingredients for ingredient in sublist]

    # Combine selected ingredients with high-confidence ingredients
    combined_ingredients = selected_ingredients + additional_ingredients

    # Step 4: Define a function to calculate ingredient match score
    def calculate_match_score(recipe_ingredients, combined_ingredients):
        recipe_set = set(recipe_ingredients)
        combined_set = set(combined_ingredients)
        return len(recipe_set.intersection(combined_set))

    # Step 5: Calculate match scores for filtered recipes only
    diet_data["MatchScore"] = diet_data["RecipeIngredientParts"].apply(
        lambda x: calculate_match_score(x, combined_ingredients)
    )

    # Step 6: Filter and sort recipes by match score
    matching_recipes = diet_data[diet_data["MatchScore"] > 0].sort_values(by="MatchScore", ascending=False)

    # Step 7: Limit to max_recipes
    top_recipes = matching_recipes.head(max_recipes)

    # Return all features for each recipe
    refined_recipes = top_recipes[
        ["RecipeId", "Name", "AuthorId", "AuthorName", "CookTime", "PrepTime", "TotalTime", "DatePublished",
         "Description", "Images", "RecipeCategory", "Keywords", "RecipeIngredientQuantities",
         "RecipeIngredientParts", "AggregatedRating", "ReviewCount", "Calories", "FatContent",
         "SaturatedFatContent", "CholesterolContent", "SodiumContent", "CarbohydrateContent", "FiberContent",
         "SugarContent", "ProteinContent", "RecipeServings", "RecipeInstructions"]
    ].to_dict(orient="records")

    return refined_recipes