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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useIngredients } from "@/context/IngredientsContext";
import {
  Trash2,
  Edit3,
  ChefHat,
  Calculator,
  Utensils,
  Plus,
} from "lucide-react";
import { fetchRecipes } from "@/utils/handleRecipes";
import PieChartComponent from "@/components/PieChartComponent";
import { deleteRecipe } from "@/utils/handleRecipes";
import { useRouter } from "next/navigation";

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

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);
  const session = useSession();
  const userId = session?.data?.user?._id;
  const router = useRouter();

  const calculateTotals = () => {
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFats = 0;

    ingredients.forEach((ingredient) => {
      const firstServing = ingredient;
      totalCalories += Number.parseInt(firstServing.calories) || 0;
      totalCarbs += Number.parseInt(firstServing.carbohydrate) || 0;
      totalProtein += Number.parseInt(firstServing.protein) || 0;
      totalFats += Number.parseInt(firstServing.fats) || 0;
    });

    setTotalCalories(totalCalories);
    setTotalCarbs(totalCarbs);
    setTotalProtein(totalProtein);
    setTotalFats(totalFats);
  };

  const handleDeleteRecipe = async (recipeId) => {
    setIsDeleting(recipeId);
    try {
      await deleteRecipe(recipeId);
      setRecipe((prevState) =>
        prevState.filter((item) => item.id !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleFetchRecipes = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const data = await fetchRecipes();
      setRecipe(data?.response || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeDetails = async (recipeId) => {
    if (!recipeId) return;
    router.push(`/dashboard/editRecipe/${recipeId}`);
  };

  useEffect(() => {
    calculateTotals();
  }, [ingredients]);

  useEffect(() => {
    handleFetchRecipes();
  }, []);

  const MacroCard = ({ label, value, color, icon: Icon }) => (
    <Card
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {label}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-[70dvw] mx-auto p-4 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
            <Utensils className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Current Ingredients
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {ingredients.length > 0
                ? `${ingredients.length} ingredients selected`
                : "No ingredients added yet"}
            </p>
          </div>
        </div>

        {ingredients.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {ingredients.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-lg transition-all duration-200 border-gray-200 dark:border-gray-700 "
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate pr-2">
                      {item.foodName}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() =>
                        handleDeleteIngredient(item, setIngredients)
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Calories:
                      </span>
                      <Badge variant="secondary">{item.calories}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Carbs:
                      </span>
                      <Badge variant="outline">{item.carbohydrate}g</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Protein:
                      </span>
                      <Badge variant="outline">{item.protein}g</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Fat:
                      </span>
                      <Badge variant="outline">{item.fats}g</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No ingredients added
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Search and add ingredients to start building your recipe
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Macro Summary Section */}
      {ingredients.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Nutritional Summary
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Total macros for this meal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MacroCard
              label="Calories"
              value={totalCalories}
              color="#f59e0b"
              icon={({ className, style }) => (
                <div className={className} style={style}>
                  🔥
                </div>
              )}
            />
            <MacroCard
              label="Carbs"
              value={`${totalCarbs}g`}
              color="#10b981"
              icon={({ className, style }) => (
                <div className={className} style={style}>
                  🌾
                </div>
              )}
            />
            <MacroCard
              label="Protein"
              value={`${totalProtein}g`}
              color="#3b82f6"
              icon={({ className, style }) => (
                <div className={className} style={style}>
                  💪
                </div>
              )}
            />
            <MacroCard
              label="Fat"
              value={`${totalFats}g`}
              color="#ef4444"
              icon={({ className, style }) => (
                <div className={className} style={style}>
                  🥑
                </div>
              )}
            />
          </div>
        </div>
      )}

      <Separator className="my-8" />

      {/* Saved Recipes Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <ChefHat className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Recipes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {isLoading
                  ? "Loading recipes..."
                  : `${recipe.length} saved recipes`}
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-10">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recipe.length > 0 ? (
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recipe.map((item) => (
              <Card
                key={item.id}
                className="relative group hover:shadow-lg transition-all duration-200 pb-4 h-[250px]"
              >
                <CardHeader>
                  <div className="flex items-center align-items-center gap-4 mb-10">
                    <CardTitle className="text-base lg:text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors w-[80%] truncate">
                      {item.name}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-600 bg-transparent"
                        onClick={() => handleRecipeDetails(item.id)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600 dark:hover:bg-red-900/20 bg-transparent"
                            disabled={isDeleting === item.id}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {isDeleting === item.id ? "Deleting..." : "Delete"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {item.name} ? This
                              action cannot be undone and will permanently
                              remove this recipe from your collection.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteRecipe(item.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Recipe
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex lg:flex-row gap-6">
                    <div className="space-y-1 w-[70%]">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center text-sm lg:text-base">
                        <Utensils className="w-4 h-4 mr-2 text-gray-500" />
                        Ingredients
                      </h4>
                      <div className="flex-1 space-y-4 max-h-24 overflow-y-auto">
                        {item.ingredients.map((ingredient, index) => (
                          <div
                            key={index}
                            className="text-xs ls:text-sm text-gray-600 dark:text-gray-400 flex items-center "
                          >
                            <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                            {ingredient.foodName}{" "}
                            {Math.round(ingredient.serving_amount)}{" "}
                            {ingredient.metric_serving_unit}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className=" absolute top-14 right-4 flex-shrink-0 flex-col items-center justify-center">
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
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <ChefHat className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No recipes saved yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Create your first recipe by adding ingredients and saving them
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateRecipe;
