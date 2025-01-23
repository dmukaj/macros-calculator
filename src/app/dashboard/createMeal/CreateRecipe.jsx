"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useIngredients } from "@/context/IngredientsContext";
import { Trash2 } from "lucide-react";
import { fetchRecipes } from "@/utils/fetchRecipes";
import PieChartComponent from "@/components/PieChartComponent";
import { deleteRecipe } from "@/utils/fetchRecipes";

const CreateRecipe = () => {
  const {
    ingredients,
    setIngredients,
    totalCalories,
    setTotalCalories,
    totalCarbs,
    setTotalCarbs,
    totalProtein,
    setTotalProtein,
    totalFats,
    setTotalFats,
    handleDeleteIngredient,
  } = useIngredients();
  const [recipe, setRecipe] = useState([]);
  const session = useSession();
  const userId = session?.data?.user?._id;

  const calculateTotals = () => {
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFats = 0;

    ingredients.forEach((ingredient) => {
      const firstServing = ingredient;
      totalCalories += parseInt(firstServing.calories) || 0;
      totalCarbs += parseInt(firstServing.carbohydrate) || 0;
      totalProtein += parseInt(firstServing.protein) || 0;
      totalFats += parseInt(firstServing.fats) || 0;
    });

    setTotalCalories(totalCalories);
    setTotalCarbs(totalCarbs);
    setTotalProtein(totalProtein);
    setTotalFats(totalFats);
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await deleteRecipe(recipeId);
      setRecipe((prevState) =>
        prevState.filter((item) => item.id !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  useEffect(() => {
    calculateTotals();
  }, [ingredients]);

  const handleFetchRecipes = async () => {
    if (!userId) return;
    const data = await fetchRecipes();
    setRecipe(data?.response);
  };

  useEffect(() => {
    handleFetchRecipes();
  }, []);

  return (
    <div className="flex flex-col gap-10 ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-between gap-6 w-full">
        {ingredients &&
          ingredients.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 justify-center border-2 p-2 rounded-lg w-full h-auto text-sm md:text-base"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.foodName}
                </span>
                <Trash2
                  className="cursor-pointer text-destructive hover:text-red-500"
                  size={20}
                  onClick={() => handleDeleteIngredient(item, setIngredients)}
                />
              </div>
              <span>Calories: {item.calories}</span>
              <span>Carbs: {item.carbohydrate}</span>
              <span>Protein: {item.protein}</span>
              <span>Fat: {item.fats}</span>
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        {ingredients.length > 0 ? (
          <h2 className="text-2xl font-bold">Total Macros For This Meal</h2>
        ) : (
          <h2 className="text-2xl font-bold">Search Food To Get Macros</h2>
        )}
        <p>Total Calories: {totalCalories}</p>
        <p>Total Carbs: {totalCarbs}</p>
        <p>Total Protein: {totalProtein}</p>
        <p>Total Fat: {totalFats}</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold flex justify-center mb-10">
          My Recipes
        </h2>

        <div className="flex flex-col justify-center items-center font-semibold container h-screen space-y-2">
          <div className="flex flex-col gap-4 items-center overflow-y-auto">
            {recipe &&
              recipe.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col border-2 p-4 rounded-lg w-full sm:w-[80dvw] h-auto bg-secondary/10"
                >
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="cursor-pointer text-white mb-6"
                      >
                        <span className="md:text-xl text-base">
                          Delete Recipe
                        </span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this recipe and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteRecipe(item.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <div className="flex md:flex-row items-center md:justify-between flex-col justify-start">
                    <div className="flex flex-col gap-2 w-full">
                      <span className="font-semibold md:text-xl text-base text-[hsl(var(--chart-4))]">
                        {item.name}
                      </span>
                      <ol>
                        <li className="md:text-lg text-base font-semibold text-[hsl(var(--chart-2))]">
                          Ingredients 🍽️
                        </li>
                        {item.ingredients.map((ingredient) => (
                          <li key={ingredient} className="md:text-base text-sm">
                            {" "}
                            - {ingredient}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <PieChartComponent
                      width={120}
                      height={120}
                      totalCalories={item.calories}
                      protein={item.protein}
                      carbohydrate={item.carbohydrate}
                      fats={item.fat}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
