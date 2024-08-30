"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFoodDetails } from "@/lib/api/fetchFoodDetails";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import FoodForm from "@/components/FoodForm";
import PieChartComponent from "@/components/PieChartComponent";
import { addFood } from "@/utils/foodUtils";
import { ArrowLeft, Plus, Check } from "lucide-react";
import Link from "next/link";

const FoodDetails = () => {
  const session = useSession();
  const [click, setClick] = useState(false);
  const [selectedFood, setSelectedFood] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
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
  }, []);

  if (!id) return <p>No food selected.</p>;

  if (loading) {
    return <p>Loading food details...</p>;
  }

  const firstServing = selectedFood?.servings?.serving[1];
  // console.log("First serving", firstServing);

  return (
    <div>
      <div className="flex justify-between text-lg items-center bg-gray-50 p-4">
        <Link href="/dashboard/search" className="mr-3">
          <ArrowLeft />
        </Link>
        <h2 className="font-semibold mr-3 ">
          {selectedFood?.food_name}, {firstServing?.serving_description}
        </h2>
        {click && firstServing ? (
          <Button onClick={() => addFood(firstServing, session, "lunch", true)}>
            <Check />
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setClick(true)}>
            <Plus />
          </Button>
        )}
      </div>
      <div className="p-4">
        <FoodForm id={id} foodData={selectedFood} />
      </div>
      {/* {firstServing && (
        <div className="flex flex-row justify-around items-center gap-4">
          <div>
            <PieChartComponent
              width={120}
              height={120}
              totalCalories={firstServing.calories || 0}
              protein={parseFloat(firstServing.protein) || 0}
              carbs={parseFloat(firstServing.carbohydrate) || 0}
              fats={parseFloat(firstServing.fat) || 0}
            />
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
      )} */}
    </div>
  );
};

export default FoodDetails;
