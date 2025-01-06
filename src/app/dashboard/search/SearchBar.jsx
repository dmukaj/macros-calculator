import { handleMealSearch } from "@/utils/handleMealSearch";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = ({
  setQuery,
  setResult,
  setLoading,
  setError,
  setShowAllResults,
  setShowMoreClicked,
}) => {
  return (
    <div>
      <div className="relative w-full ">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          onChange={(e) => {
            setQuery(e.target.value);
            handleMealSearch(
              e,
              setResult,
              setLoading,
              setError,
              setShowAllResults,
              setShowMoreClicked
            );
          }}
          placeholder="Search food..."
          className=" appearance-none bg-background pl-8 w-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;
