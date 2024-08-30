"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFood } from "@/context/FoodContext";
import { Button } from "@/components/ui/button";
import { addFood } from "@/utils/foodUtils";
import { useSession } from "next-auth/react";

import Link from "next/link";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllResults, setShowAllResults] = useState(false);

  const session = useSession();
  const { setSelectedFood } = useFood();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);
    setShowAllResults(false);

    try {
      const response = await fetch(
        `/api/food?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      const foodItem = data.foods_search.results.food;
      console.log(foodItem);
      setResult(Array.isArray(foodItem) ? foodItem : []);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data :(", error);
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setShowAllResults(true);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="m-4">
        <div className="relative w-full ">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food..."
            className=" appearance-none bg-background pl-8 w-full"
          />
        </div>
      </form>
      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col justify-center space-y-2 mt-4 mx-4">
        {result &&
          (showAllResults ? result : result.slice(0, 4)).map((item) => (
            <div
              key={item?.food_id}
              className="bg-gray-100 rounded-lg p-4 text-xs flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.food_name}</p>
                <div className="">
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
                <Button onClick={() => addFood(item, session, "lunch")}>
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
      </div>
      {!showAllResults && result.length > 4 && (
        <div className="flex justify-center mt-4">
          <Button
            variant="ghost"
            className="hover:text-blue-500"
            onClick={handleShowMore}
          >
            Show more results ...
          </Button>
        </div>
      )}
      <div className="flex justify-center font-semibold ">History</div>
    </div>
  );
};

export default SearchBar;
