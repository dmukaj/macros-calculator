import { Trash2Icon } from "lucide-react";
import { deleteFood } from "@/utils/foodUtils";
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";

export default function DeleteFoodBtn({ foodId }) {
  const [click, setClick] = useState(false);
  const { toast } = useToast();
  const handleDeleteFood = async () => {
    try {
      await deleteFood(foodId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting food:", error);
    }
    setClick(!click);
    toast({
      title: "Success!",
      description: "Food deleted successfully",
      variant: "destructive",
    });
  };
  return <Trash2Icon color="red" size={20} onClick={handleDeleteFood} />;
}
