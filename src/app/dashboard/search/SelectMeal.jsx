"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectMeal = ({ mealType, setMeal }) => {
  const handleMealChange = (value) => {
    setMeal(value);
    localStorage.setItem("selectedMeal", value);
  };

  return (
    <div>
      <Select
        onValueChange={(value) => {
          handleMealChange(value);
        }}
        defaultValue={mealType}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={mealType || "Select Meal"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Breakfast">Breakfast</SelectItem>
          <SelectItem value="Lunch">Lunch</SelectItem>
          <SelectItem value="Dinner">Dinner</SelectItem>
          <SelectItem value="Snack">Snack</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectMeal;
