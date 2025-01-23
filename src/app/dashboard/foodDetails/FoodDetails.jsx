"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFoodDetails } from "@/lib/api/fetchFoodDetails";
import AddFoodButton from "@/components/AddFoodButton";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import FoodForm from "@/components/FoodForm";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { CookingPot } from "lucide-react";
import { useIngredients } from "@/context/IngredientsContext";
import { useRouter } from "next/navigation";

const FoodDetails = () => {
  const router = useRouter();
  const session = useSession();
  const [selectedFood, setSelectedFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState("");
  const [date, setDate] = useState();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const firstServing = selectedFood?.servings?.serving[0];
  const [calculatedValues, setCalculatedValues] = useState({});
  const { handleAddIngredient } = useIngredients();

  let servingAmount = firstServing?.metric_serving_amount
    ? Math.round(firstServing?.metric_serving_amount)
    : firstServing?.serving_description;

  useEffect(() => {
    const storedMeal = localStorage.getItem("selectedMeal");
    const storedDate = localStorage.getItem("selectedDate");
    if (storedMeal) {
      setMeal(storedMeal);
    }
    if (storedDate) {
      setDate(storedDate);
    }
    const loadFoodDetails = async () => {
      try {
        const data = await fetchFoodDetails(id);

        setSelectedFood(data);
      } catch (error) {
        console.log("Error fetching food details", error);
      } finally {
        setLoading(false);
      }
    };

    loadFoodDetails();
  }, [id]);

  if (!id) return <p>No food selected.</p>;
  if (loading) {
    return <p className="h-screen">Loading food details...</p>;
  }

  return (
    <div className="h-screen">
      <div className="flex justify-between text-lg items-center p-4">
        <Button onClick={() => router.back()} className="mr-3">
          <ArrowLeft />
        </Button>

        <div className="flex flex-row items-center gap-2 justify-center font-semibold">
          <p className="text-blue-500  "> {format(date, "LLL dd, y")}</p>
          <h2 className=" mr-3 ">
            {selectedFood?.food_name} ({servingAmount || ""})
            {firstServing?.metric_serving_unit || ""}
          </h2>
        </div>
        <div className="flex gap-3">
          <AddFoodButton
            firstServing={firstServing}
            selectedFood={selectedFood}
            session={session}
            calculatedValues={calculatedValues}
            meal={meal}
            date={date}
            foodName={selectedFood?.food_name}
          />

          {selectedFood?.servings?.serving && (
            <Button onClick={() => handleAddIngredient(calculatedValues)}>
              <CookingPot />
            </Button>
          )}
        </div>
      </div>
      <div className="p-4">
        <FoodForm
          id={id}
          foodData={selectedFood}
          calculatedValues={calculatedValues}
          setCalculatedValues={setCalculatedValues}
          meal={meal}
          setMeal={setMeal}
          onUpdateFoodData={(newValues) => {
            setSelectedFood(newValues);
          }}
        />
      </div>
    </div>
  );
};

export default FoodDetails;
