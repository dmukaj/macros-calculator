"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddFoodButton from "@/components/AddFoodButton";
import { useSession } from "next-auth/react";
import { useFood } from "@/context/FoodContext";
import FoodForm from "@/components/FoodForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { fetchRecipeDetails } from "@/lib/api/fetchRecipeDetails";

const RecipeDetails = () => {
  const session = useSession();
  const { selectedFood, setSelectedFood } = useFood();

  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState("");
  const [date, setDate] = useState();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [calculatedValues, setCalculatedValues] = useState({});

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
        const rawData = await fetchRecipeDetails(id);
        // Reformat the data to match the required format
        const formattedData = {
          food_id: rawData.id || "",
          food_name: rawData.name || "",
          ingredients: rawData.ingredients,
          servings: {
            serving: {
              calories: rawData.calories,
              carbohydrate: rawData.carbohydrate,
              fat: rawData.fat,
              protein: rawData.protein,
              measurement_description: "",
              metric_serving_amount: 1,
              metric_serving_unit: "g",
              serving_description: "",
              number_of_units: 1,
              serving_id: "",
            },
          },
        };
        setSelectedFood(formattedData);
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
        <Link href="/dashboard/myRecipes" className="mr-3">
          <ArrowLeft />
        </Link>
        <div className="flex flex-row items-center gap-2 justify-center font-semibold">
          <p className="text-blue-500  "> {format(date, "LLL dd, y")}</p>
          <h2 className=" mr-3 ">{selectedFood.food_name}</h2>
        </div>
        <div className="flex gap-3">
          <AddFoodButton
            firstServing={selectedFood}
            selectedFood={selectedFood}
            session={session}
            calculatedValues={calculatedValues}
            meal={meal}
            date={date}
            foodName={selectedFood?.food_name}
          />
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
        <div className="flex flex-col gap-4 items-start justify-center mt-10">
          <h2 className="text-2xl font-semibold flex justify-center ">
            Ingredients in this recipe
          </h2>
          <h3>
            {selectedFood?.ingredients.map((item) => (
              <p key={item.id}> - {item}</p>
            ))}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
