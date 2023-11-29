import "./styles.css";

import React from "react";

const RecipeCard = ({ recipe, onPin, onUnpin, isPinned }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.label} />
      <h3>{recipe.label}</h3>
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
        {isPinned ? (
          <button disabled style={{ opacity: 0.5 }}>
            Pinned
          </button>
        ) : (
          <button onClick={() => onPin(recipe)}>Pin</button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
