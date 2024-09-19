import { Trash2Icon } from "lucide-react";
import { deleteFood } from "@/utils/foodUtils";
import { useToast } from "@/components/hooks/use-toast";
import { useEffect, useState } from "react";

export default function DeleteFoodBtn({ foodId, setFilteredMealData }) {
  const { toast } = useToast();

  const handleDeleteFood = async () => {
    try {
      await deleteFood(foodId);
      setFilteredMealData((prevState) =>
        prevState.filter((item) => item.id !== foodId)
      );
    } catch (error) {
      console.error("Error deleting food:", error);
    }

    toast({
      title: "Success!",
      description: "Food deleted successfully",
      variant: "destructive",
    });
  };

  return (
    <Trash2Icon
      className="cursor-pointer text-destructive hover:text-red-500"
      size={20}
      onClick={handleDeleteFood}
    />
  );
}
