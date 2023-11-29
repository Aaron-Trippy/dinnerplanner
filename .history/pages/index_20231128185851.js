import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [pinnedRecipes, setPinnedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const fetchData = async () => {
    try {
      const APP_ID = "d1cb94c1";
      const APP_KEY = "d2ef0c2d4777921b87af4b254f1423a5";

      const response = await fetch(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=12`
      );
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const pinRecipe = (recipe) => {
    const timestamp = new Date().getTime();
    const updatedPinnedRecipes = [
      { ...recipe.recipe, timestamp },
      ...pinnedRecipes,
    ].sort((a, b) => b.timestamp - a.timestamp);

    setPinnedRecipes(updatedPinnedRecipes);
  };

  const unpinRecipe = (recipe) => {
    const updatedPinnedRecipes = pinnedRecipes.filter(
      (pinnedRecipe) => pinnedRecipe !== recipe
    );
    setPinnedRecipes(updatedPinnedRecipes);
  };

  const handleSearch = () => {
    fetchData();
    setShowResults(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="top-container">
        <h1>Dinner Planner</h1>
        <p>
          Search for the recipes you want, pin recipes to your Cook Book, and
          craft tonight's perfect meal.
        </p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-box"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>

      <div>
        <h3>Cook Book</h3>
        <div className="pinned-recipes">
          {pinnedRecipes.map((recipe) => (
            <div className="pinned-recipe-card">
              <div key={recipe.label}>
                <p>{recipe.label}</p>
                <p>{`Calories: ${Math.round(recipe.calories)}`}</p>
                <div className="card-buttons">
                  <a
                    href={recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-recipe"
                  >
                    View Recipe
                  </a>
                  <button onClick={() => unpinRecipe(recipe)}>Unpin</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showResults && (
        <div>
          <h2>All Recipes</h2>
          <div className="recipe-container">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.recipe.label}
                recipe={recipe.recipe}
                onPin={() => pinRecipe(recipe)}
                onUnpin={() => unpinRecipe(recipe)}
                isPinned={pinnedRecipes.some(
                  (pinnedRecipe) => pinnedRecipe.uri === recipe.recipe.uri
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
