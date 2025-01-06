"use client";

import { useState, useEffect } from "react";
import { fetchRecipes } from "@/utils/fetchRecipes";
import FoodItemList from "../search/FoodItemList";
import ToolTipLink from "@/components/ToolTipLink";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import SelectMeal from "@/app/dashboard/search/SelectMeal";

const Recipe = ({ showAllResults }) => {
  const [recipe, setRecipe] = useState([]);
  const [meal, setMeal] = useState("");
  const [date, setDate] = useState(new Date());

  const getLocalStorage = () => {
    const selectedMeal = localStorage?.getItem("selectedMeal");
    const selectedDate = localStorage?.getItem("selectedDate");
    return { selectedMeal, selectedDate };
  };

  useEffect(() => {
    const { selectedMeal, selectedDate } = getLocalStorage();
    setMeal(selectedMeal);
    setDate(selectedDate);
  }, [getLocalStorage]);

  const handleFetchRecipes = async () => {
    const data = await fetchRecipes();
    setRecipe(data?.response);
  };
  useEffect(() => {
    handleFetchRecipes();
  }, []);

  return (
    <div className=" flex flex-col flex-grow m-6 space-y-6">
      <div className="relative flex flex-row text-lg justify-center items-center p-4 font-semibold ">
        <div className="flex flex-col sm:flex-row items-center justify-center absolute sm:right-26 xs:right-0 gap-1 ">
          <p className="text-sm">{format(date, "LLL dd, y")}</p>
          <SelectMeal mealType={meal} setMeal={setMeal} />
        </div>
        <ToolTipLink
          icon={<ArrowLeft size={25} />}
          href={"/dashboard/search"}
          className="absolute left-0 mr-2"
          text={"Go to Dashboard"}
        />
      </div>
      <FoodItemList
        meal={meal}
        date={date}
        result={recipe}
        showAllResults={showAllResults}
      />
    </div>
  );
};

export default Recipe;
