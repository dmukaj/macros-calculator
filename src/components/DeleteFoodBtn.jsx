import { Trash2Icon } from "lucide-react";
import { deleteFood } from "@/utils/foodUtils";
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DeleteFoodBtn({ foodId, setFilteredMealData }) {
  const [click, setClick] = useState(false);
  const { toast } = useToast();

  const handleDeleteFood = async () => {
    try {
      setClick(true);
      await deleteFood(foodId);
      setFilteredMealData((prevState) =>
        prevState.filter((item) => item.id !== foodId)
      );
      setClick(false);
    } catch (error) {
      setClick(false);
      console.error("Error deleting food:", error);
    }

    toast({
      title: "Success!",
      description: "Food deleted successfully",
      variant: "destructive",
    });
  };

  return (
    <Button variant="ghost" onClick={handleDeleteFood} disabled={click}>
      <Trash2Icon
        className="cursor-pointer text-destructive hover:text-red-500"
        size={20}
      />
    </Button>
  );
}
