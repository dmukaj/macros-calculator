import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { addFood } from "@/utils/foodUtils";
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";

const AddFoodButton = ({
  calculatedValues,
  firstServing,
  session,
  meal,
  foodName,
  date,
}) => {
  const { toast } = useToast();
  const [click, setClick] = useState(false);

  const handleAddFood = () => {
    setClick(!click);

    if (firstServing && session) {
      addFood(
        {
          ...firstServing,
          ...calculatedValues,
        },
        session,
        meal,
        foodName,
        date
      );
    }
    toast({
      title: "Success!",
      description: "Food added successfully",
      variant: "success",
    });

    setTimeout(() => {
      setClick(false);
    }, 3000);
  };

  return (
    <>
      <Button
        variant={click ? "default" : "outline"}
        onClick={handleAddFood}
        disabled={click}
      >
        {click ? <Check /> : <Plus />}
      </Button>
    </>
  );
};

export default AddFoodButton;
