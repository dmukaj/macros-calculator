"use client";

import { useFood } from "@/context/FoodContext";
import { useIngredients } from "@/context/IngredientsContext";
import { useToast } from "@/components/hooks/use-toast";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { addFood } from "@/utils/foodUtils";
import Link from "next/link";

const FoodItemList = ({ meal, date, result, showAllResults }) => {
  const { handleAddIngredient } = useIngredients();
  const { toast } = useToast();
  const pathname = usePathname();
  const session = useSession();
  const { setSelectedFood } = useFood({});

  return (
    <div className="py-4 px-8">
      <div className="flex flex-col justify-center space-y-2">
        {result &&
          (showAllResults ? result : result.slice(0, 6)).map((item) => {
            let firstServing;
            if (item.servings?.serving) {
              firstServing = item.servings.serving[0];
            }
            return (
              <div
                key={item?.food_id || item?.id}
                className="bg-secondary rounded-lg p-4 text-xs flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.food_name || item.name}</p>
                  <div>
                    {firstServing ? (
                      <div
                        key={firstServing?.serving_id}
                        className="flex flex-row justify-start gap-3"
                      >
                        <span>{firstServing?.serving_description}</span>
                        <span>{`${firstServing?.calories} cal`}</span>
                      </div>
                    ) : (
                      <div
                        key={item.id}
                        className="flex flex-row justify-start gap-3"
                      >
                        <span>{item.calories} cal</span>
                        <span>{item?.protein} g protein</span>
                        <span>{item?.carbohydrate} g carbs</span>
                        <span>{item?.fat} g fat</span>
                      </div>
                    )}
                    <p className="font-semibold">{item.brand_name || ""}</p>
                  </div>
                </div>

                <div className="flex justify-between gap-3">
                  {pathname === "/dashboard/search" && (
                    <Button
                      onClick={() => {
                        addFood(
                          firstServing || item,
                          session,
                          meal,
                          item.food_name,
                          date
                        );
                        toast({
                          title: "Success!",
                          description: "Food added to your meal.",
                          variant: "success",
                        });
                      }}
                    >
                      Add Food
                    </Button>
                  )}
                  {pathname === "/dashboard/createMeal" && (
                    <Button
                      onClick={() => {
                        const tranformedItem = {
                          id: item.food_id,
                          foodName: item.food_name || item.name,
                          calories: firstServing.calories || item.calories,
                          carbohydrate:
                            firstServing.carbohydrate || item.carbohydrate,
                          protein: firstServing.protein || item.protein,
                          fats: firstServing.fats || item.fat,
                        };
                        handleAddIngredient(tranformedItem);
                      }}
                    >
                      Add to meal
                    </Button>
                  )}
                  {firstServing ? (
                    <Link
                      href={{
                        pathname: "/dashboard/foodDetails",
                        query: {
                          id: item.id || item.food_id,
                        },
                      }}
                      key={item?.food_id || item?.id}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setSelectedFood(item)}
                      >
                        Edit Food
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href={{
                        pathname: "/dashboard/recipeDetails",
                        query: {
                          id: item.id || item.food_id,
                        },
                      }}
                      key={item?.food_id || item?.id}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setSelectedFood(item)}
                      >
                        Edit Food
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FoodItemList;
