import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

const SelectMeal = () => {
  const [meal, setMeal] = useState("");

  useEffect(() => {
    const storedMeal = localStorage.getItem("selectedMeal");
    if (storedMeal) {
      setMeal(storedMeal);
    }
  }, []);

  const handleMealChange = (value) => {
    setMeal(value);
    localStorage.setItem("selectedMeal", value); // Store the selected meal in localStorage
  };
  return (
    <Select
      onValueChange={(value) => {
        handleMealChange(value);
      }}
      defaultValue={meal}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={meal || "Select Meal"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Breakfast">Breakfast</SelectItem>
        <SelectItem value="Lunch">Lunch</SelectItem>
        <SelectItem value="Dinner">Dinner</SelectItem>
        <SelectItem value="Snack">Snack</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectMeal;
