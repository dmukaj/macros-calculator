"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FoodItemList from "./FoodItemList";

const SearchPage = ({ setQuery, setResult, result }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meal, setMeal] = useState("");

  const [date, setDate] = useState(new Date());
  const [showAllResults, setShowAllResults] = useState(false);
  const [showMoreClicked, setShowMoreClicked] = useState(false);

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

  const handleShowMore = async () => {
    setShowAllResults(true);
    setShowMoreClicked(true);
  };
  const handleShowLess = async () => {
    setShowAllResults(false);
  };

  return (
    <div className="flex flex-col space-y-4 mx-6">
      <SearchBar
        setQuery={setQuery}
        setResult={setResult}
        setLoading={setLoading}
        setError={setError}
        setShowAllResults={setShowAllResults}
        setShowMoreClicked={setShowMoreClicked}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <FoodItemList
        meal={meal}
        date={date}
        result={result}
        showAllResults={showAllResults}
      />
      {!showAllResults && result.length > 6 && (
        <div className="flex justify-center mt-4 ">
          <Button variant="ghost" onClick={() => handleShowMore()}>
            Show more ...
          </Button>
        </div>
      )}
      {showAllResults && showMoreClicked && (
        <div className="flex justify-center mt-4">
          <Button variant="ghost" onClick={() => handleShowLess()}>
            Show less ...
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
