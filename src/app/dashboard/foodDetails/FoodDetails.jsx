"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import FoodForm from "@/components/FoodForm";
import PieChartComponent from "@/components/PieChartComponent";

const FoodDetails = () => {
  const session = useSession();

  const handleAddFood = async (item) => {
    try {
      const response = await fetch(`/api/addFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.food_name,
          user: session.data.user._id,
          calories: item.calories,
          carbs: item.carbs,
          protein: item.protein,
          fat: item.fat,
        }),
      });
      if (response.ok) {
        console.log("Food added to meal successfully!");
      } else {
        console.error("Failed to add food to meal.");
      }
    } catch (error) {
      console.error("Error adding food to meal:", error);
    }
  };

  const [selectedFood, setSelectedFood] = useState({});
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) return <p>No food selected.</p>;

  useEffect(() => {
    fetchFoodDetails();
  }, []);

  const fetchFoodDetails = async () => {
    try {
      const response = await fetch(`/api/food/details?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch food details");
      }
      const data = await response.json();
      setSelectedFood(data);
      console.log("Food details fetched", data);
    } catch (error) {
      console.log("Error fetching food details", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading food details...</p>;
  }

  // Extract the first serving if it exists
  const firstServing = selectedFood?.servings?.serving?.[0];

  return (
    <div>
      <div className="flex justify-between text-lg items-center bg-gray-50 p-4">
        <h2 className="font-semibold mr-3 ">{selectedFood?.food_name}</h2>
        <Button onClick={() => handleAddFood(firstServing, "lunch")}>
          Log Food
        </Button>
      </div>
      <div className="p-4">
        <FoodForm />
      </div>
      {firstServing && (
        <div className="flex flex-row justify-around items-center gap-4">
          <div>
            <PieChartComponent width={120} height={120} />
          </div>
          <div>
            <h2>Protein</h2>
            <h3>{firstServing.protein}</h3>
          </div>
          <div>
            <h2>Carbs</h2>
            <h3>{firstServing.carbohydrate}</h3>
          </div>
          <div>
            <h2>Fats</h2>
            <h3>{firstServing.fat}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
