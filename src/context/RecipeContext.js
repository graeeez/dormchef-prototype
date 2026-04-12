import React, { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const toggleFavorite = (recipe) => {
    setSavedRecipes((prev) => {
      const exists = prev.find((r) => r.id === recipe.id);
      if (exists) {
        return prev.filter((r) => r.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isRecipeSaved = (id) => savedRecipes.some((r) => r.id === id);

  return (
    <RecipeContext.Provider value={{ savedRecipes, toggleFavorite, isRecipeSaved }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipeContext);