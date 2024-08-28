"use client";

import { createContext, useContext, useState } from "react";

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [selectedFood, setSelectedFood] = useState({});

  return (
    <FoodContext.Provider value={{ selectedFood, setSelectedFood }}>
      {children}
    </FoodContext.Provider>
  );
};
