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
  };

  return (
    <>
      {click ? (
        <Button>
          <Check />
        </Button>
      ) : (
        <Button variant="outline" onClick={handleAddFood}>
          <Plus />
        </Button>
      )}
    </>
  );
};

export default AddFoodButton;
