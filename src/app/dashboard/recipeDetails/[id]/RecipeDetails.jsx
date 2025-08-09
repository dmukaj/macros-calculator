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
import { useRouter } from "next/navigation";

const RecipeDetails = () => {
  const session = useSession();
  const { selectedFood, setSelectedFood } = useFood();

  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState("");
  const [date, setDate] = useState();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [calculatedValues, setCalculatedValues] = useState([]);
  const router = useRouter();

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
        const formattedData = {
          food_id: rawData.id || "",
          food_name: rawData.name || "",
          calories: rawData.calories,
          carbohydrate: rawData.carbohydrate,
          protein: rawData.protein,
          fat: rawData.fat,
          ingredients: rawData.ingredients,

          // servings: {
          //   serving: {
          //     calories: rawData.calories,
          //     carbohydrate: rawData.carbohydrate,
          //     fat: rawData.fat,
          //     protein: rawData.protein,
          //     measurement_description: "",
          //     metric_serving_amount: 1,
          //     metric_serving_unit: "g",
          //     serving_description: "",
          //     number_of_units: 1,
          //     serving_id: "",
          //   },
          // },
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
          <h2 className="text-2xl font-semibold flex justify-center">
            Ingredients in this recipe
          </h2>

          <div className="w-full space-y-3">
            {selectedFood.ingredients &&
              selectedFood?.ingredients.map((item, index) => {
                if (typeof item === "object" && item !== null) {
                  return (
                    <div
                      key={item.id || index}
                      className="group relative p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            -{" "}
                            {item.foodName ||
                              item.food_name ||
                              item.name ||
                              "Unknown ingredient"}
                          </p>

                          {(item.serving_amount || item.servingAmount) && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Amount:{" "}
                              {item.serving_amount || item.servingAmount}{" "}
                              {item.metric_serving_unit || item.unit || "g"}
                            </p>
                          )}

                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Calories: {item.calories} | Protein: {item.protein}g
                            | Carbs: {item.carbohydrate}g | Fat:{" "}
                            {item.fats || item.fat}g
                          </p>
                        </div>

                        <button
                          className="ml-4 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-600 rounded-md opacity-0 group-hover:opacity-100 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0"
                          onClick={() =>
                            router.replace(`/dashboard/editRecipe/${id}`)
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
