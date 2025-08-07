"use client";

import SearchPage from "./Search";
import History from "@/components/History";
import { ArrowLeft, ScanSearch } from "lucide-react";
import { format } from "date-fns";
import SelectMeal from "@/app/dashboard/search/SelectMeal";
import { useState, useEffect } from "react";
import ToolTipLink from "@/components/ToolTipLink";

const page = ({ loading }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
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

  return (
    <div className=" flex flex-col flex-grow m-6 w-[60dvw] mx-auto">
      <div className="relative flex flex-row text-lg justify-center items-center p-4 font-semibold mb-10">
        <ToolTipLink
          href={"/dashboard"}
          text={"Go to Dashboard"}
          icon={<ArrowLeft size={25} />}
          className="absolute left-0 mr-6 "
        />
        <div className="flex flex-col sm:flex-row items-center justify-center absolute sm:right-26 xs:right-0 gap-1 ">
          <p className="text-sm">{format(date, "LLL dd, y")}</p>
          <SelectMeal mealType={meal} setMeal={setMeal} />
        </div>
        <ToolTipLink
          href={"/dashboard/myRecipes"}
          text={"Search My Recipes"}
          icon={<ScanSearch size={25} />}
          className="absolute right-0 ml-6"
        />
      </div>
      <SearchPage setResult={setResult} setQuery={setQuery} result={result} />

      {!loading && result.length === 0 && !query && (
        <History mealType={meal} setMeal={setMeal} date={date} />
      )}
    </div>
  );
};

export default page;
