"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useFood } from "@/context/FoodContext";
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
      console.log("Fetched food items", data);

      const foodItem = data.foods_search.results.food;
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

  const handleAddFood = async (item) => {
    try {
      const response = await fetch(`/api/addFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.food_name,
          user: session.data.user._id,
          calories: item.calories,
          carbs: item.carbs,
          protein: item.protein,
          fat: item.fat,
        }),
      });
      if (response.ok) {
        console.log("Food added to meal successfully!");
      } else {
        console.error("Failed to add food to meal.");
      }
    } catch (error) {
      console.error("Error adding food to meal:", error);
    }
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
                <div className="flex gap-2">
                  {item?.servings.serving
                    .filter(
                      (serving) =>
                        serving.measurement_description === "g" ||
                        serving.measurement_description === "ml"
                    )
                    .map((serving) => (
                      <p key={serving?.serving_id}>
                        {serving?.serving_description}, {serving?.calories}
                        cal,
                      </p>
                    ))}
                  <p className="font-semibold">{item.brand_name}</p>
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <Button onClick={() => handleAddFood(item, "lunch")}>
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
