"use client";

import { createContext, useContext, useState } from "react";

const IngredientsContext = createContext();

export const useIngredients = () => useContext(IngredientsContext);

export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFats, setTotalFats] = useState(0);

  const handleAddIngredient = (ingredient) => {
    setIngredients((prevState) => [...prevState, ingredient]);
  };

  const handleDeleteIngredient = (ingredient) => {
    setIngredients((prevState) =>
      prevState.filter((item) => item !== ingredient)
    );
  };

  return (
    <IngredientsContext.Provider
      value={{
        ingredients,
        setIngredients,
        totalCalories,
        setTotalCalories,
        totalCarbs,
        setTotalCarbs,
        totalProtein,
        setTotalProtein,
        totalFats,
        setTotalFats,
        handleAddIngredient,
        handleDeleteIngredient,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
};
