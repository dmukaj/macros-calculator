"use client";

import Recipe from "./Recipe";
import MealForm from "./MealForm";

const page = () => {
  return (
    <div className="flex flex-col flex-grow p-6">
      <MealForm />
      <Recipe />
    </div>
  );
};

export default page;
