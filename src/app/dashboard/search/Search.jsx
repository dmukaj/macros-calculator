"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addFood } from "@/utils/foodUtils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/hooks/use-toast";
import { useFood } from "@/context/FoodContext";
import History from "@/components/History";
import { SearchFood } from "@/utils/SearchFood";
import _ from "lodash";

const SearchBar = () => {
  const [query] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllResults, setShowAllResults] = useState(false);
  const [showMoreClicked, setShowMoreClicked] = useState(false);
  const { toast } = useToast();

  const meal = localStorage.getItem("selectedMeal");
  const date = localStorage.getItem("selectedDate");

  const session = useSession();
  const { setSelectedFood } = useFood({});

  const handleSearch = async (e) => {
    let query = e.target.value;

    if (query.length < 2) return;
    setLoading(true);
    setError(null);
    setShowAllResults(false);

    const searchResults = await SearchFood(query);
    setResult(searchResults);
  };

  const handleShowMore = async () => {
    setShowAllResults(true);
    setShowMoreClicked(true);
  };
  const handleShowLess = async () => {
    setShowAllResults(false);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="relative w-full ">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          onChange={_.debounce(handleSearch, 700)}
          placeholder="Search food..."
          className=" appearance-none bg-background pl-8 w-full"
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col justify-center space-y-2">
        {result &&
          (showAllResults ? result : result.slice(0, 4)).map((item) => (
            <div
              key={item?.food_id}
              className="bg-secondary rounded-lg p-4 text-xs flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.food_name}</p>
                <p>{item.servings.serving.calories}</p>
                <div>
                  {item?.servings.serving
                    .filter(
                      (serving) =>
                        serving.measurement_description === "g" ||
                        serving.measurement_description === "ml"
                    )
                    .map((serving, index) => (
                      <div
                        key={serving?.serving_id}
                        className="flex flex-row justify-start gap-3"
                      >
                        <p> {index === 1 && serving?.serving_description}</p>
                        <p> {index === 1 && `${serving?.calories} cal`}</p>
                      </div>
                    ))}
                  <p className="font-semibold">{item.brand_name}</p>
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <Button
                  onClick={() => {
                    addFood(
                      item.servings.serving[0],
                      session,
                      meal,
                      item.food_name,
                      date
                    );
                    toast({
                      title: "Success!",
                      description: "Food added to your meal.",
                      variant: "success",
                    });
                  }}
                >
                  Add Food
                </Button>
                <Link
                  href={{
                    pathname: "/dashboard/foodDetails",
                    query: {
                      id: item.food_id,
                    },
                  }}
                  key={item?.food_id}
                >
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFood(item)}
                  >
                    Edit Food
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        {!loading && result.length === 0 && !query && <History />}
      </div>
      {!showAllResults && result.length > 4 && (
        <div className="flex justify-center mt-4 ">
          <Button variant="ghost" onClick={() => handleShowMore()}>
            Show more ...
          </Button>
        </div>
      )}{" "}
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

export default SearchBar;
