"use client";
import { useTransition } from "react";
import { useFood } from "@/context/FoodContext";
import { useIngredients } from "@/context/IngredientsContext";
import { useToast } from "@/components/hooks/use-toast";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { addFood } from "@/utils/foodUtils";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Utensils,
  Flame,
  Beef,
  Wheat,
  Droplets,
} from "lucide-react";

export const NutritionBadge = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center space-x-1.5 bg-gray-50 dark:bg-gray-800 rounded-full px-3 py-1.5">
    <Icon className="w-3.5 h-3.5" style={{ color }} />
    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
      {value} {label}
    </span>
  </div>
);

const FoodItemList = ({ meal, date, result, showAllResults }) => {
  const { handleAddIngredient } = useIngredients();
  const { toast } = useToast();
  const pathname = usePathname();
  const session = useSession();
  const { setSelectedFood } = useFood({});
  const { isPending } = useTransition();
  const displayedResults = showAllResults ? result : result?.slice(0, 6);

  const handleAddFood = (item, firstServing) => {
    addFood(firstServing || item, session, meal, item.food_name, date);
    toast({
      title: "Success!",
      description: "Food added to your meal.",
      variant: "success",
    });
  };

  const handleAddToMeal = (item, firstServing) => {
    const transformedItem = {
      id: item.food_id,
      foodName: item.food_name || item.name,
      calories: firstServing?.calories || item.calories,
      carbohydrate: firstServing?.carbohydrate || item.carbohydrate,
      protein: firstServing?.protein || item.protein,
      fats: firstServing?.fat || item.fat,
      serving_amount:
        firstServing?.metric_serving_amount || item.metric_serving_amount,
      metric_serving_unit:
        firstServing?.metric_serving_unit || item.metric_serving_unit,
      serving_description:
        firstServing?.serving_description || item.serving_description,
    };
    handleAddIngredient(transformedItem);
  };

  if (!isPending && !result) {
    return (
      <div className="py-8">
        <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Utensils className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No food items found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Try searching for different food items or adjust your search
              criteria
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Search Results
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {displayedResults.length} of {result.length} items
            {!showAllResults && result.length > 6}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {displayedResults.map((item) => {
          let firstServing;
          if (item.servings?.serving) {
            firstServing = item.servings.serving[0];
          }

          const foodData = firstServing || item;
          const calories = foodData.calories;
          const protein = foodData.protein;
          const carbs = foodData.carbohydrate;
          const fat = foodData.fats || foodData.fat;

          return (
            <Card
              key={item?.food_id || item?.id}
              className="group hover:shadow-md transition-all duration-200 border-gray-200 dark:border-gray-700"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Food Information */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white leading-tight">
                        {item.food_name || item.name}
                      </h4>
                      {item.brand_name && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {item.brand_name}
                        </p>
                      )}
                      {firstServing?.serving_description && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                          {firstServing.serving_description}
                        </p>
                      )}
                    </div>

                    {/* Nutrition Information */}
                    <div className="flex flex-wrap gap-2">
                      <NutritionBadge
                        icon={Flame}
                        label="cal"
                        value={calories}
                        color="#f59e0b"
                      />
                      {protein && (
                        <NutritionBadge
                          icon={Beef}
                          label="protein"
                          value={`${protein}g`}
                          color="#3b82f6"
                        />
                      )}
                      {carbs && (
                        <NutritionBadge
                          icon={Wheat}
                          label="carbs"
                          value={`${carbs}g`}
                          color="#10b981"
                        />
                      )}
                      {fat && (
                        <NutritionBadge
                          icon={Droplets}
                          label="fat"
                          value={`${fat}g`}
                          color="#ef4444"
                        />
                      )}
                    </div>
                  </div>

                  <Separator
                    orientation="vertical"
                    className="hidden lg:block h-16"
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:w-32">
                    {pathname === "/dashboard/search" && (
                      <Button
                        onClick={() => handleAddFood(item, firstServing)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Food
                      </Button>
                    )}

                    {pathname === "/dashboard/createMeal" && (
                      <Button
                        onClick={() => handleAddToMeal(item, firstServing)}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Meal
                      </Button>
                    )}

                    <Link
                      href={{
                        pathname: firstServing
                          ? "/dashboard/foodDetails"
                          : `/dashboard/editRecipe/${item.id}`,
                        query: {
                          id: item.id || item.food_id,
                        },
                      }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setSelectedFood(item)}
                        className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                        size="sm"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Food
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FoodItemList;
