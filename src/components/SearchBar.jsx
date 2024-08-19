"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/food?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResult(Array.isArray(data.foods) ? data.foods : []);
      setLoading(false);
    } catch (error) {
      setError("error :((", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food..."
            className=" appearance-none bg-background pl-8 md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {result &&
          result.map((item) => (
            <div key={item.fdcId}>
              <p>
                {item.description} -{" "}
                {
                  item.foodNutrients.find((n) => n.nutrientName === "Energy")
                    ?.value
                }{" "}
                kcal
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
