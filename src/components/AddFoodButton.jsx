import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { addFood } from "@/utils/foodUtils";
import { useState } from "react";

const AddFoodButton = ({
  firstServing,
  selectedFood,
  session,
  meal,
  foodName,
}) => {
  const [click, setClick] = useState(false);

  const handleAddFood = () => {
    if (firstServing && session) {
      addFood({ ...firstServing, ...selectedFood }, session, meal, foodName);
    }
  };

  return (
    <>
      {click && firstServing ? (
        <Button onClick={handleAddFood}>
          <Check />
        </Button>
      ) : (
        <Button variant="outline" onClick={() => setClick(true)}>
          <Plus />
        </Button>
      )}
    </>
  );
};

export default AddFoodButton;
