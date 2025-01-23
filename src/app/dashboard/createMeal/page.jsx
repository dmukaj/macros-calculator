"use client";

import CreateRecipe from "./CreateRecipe";
import MealForm from "./MealForm";

const page = () => {
  return (
    <div className="flex flex-col flex-grow p-6">
      <MealForm />
      <CreateRecipe />
    </div>
  );
};

export default page;
