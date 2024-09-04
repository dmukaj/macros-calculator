"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFoodDetails } from "@/lib/api/fetchFoodDetails";
import { useSession } from "next-auth/react";
import FoodForm from "@/components/FoodForm";
import AddFoodButton from "@/components/AddFoodButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const FoodDetails = ({ foodData }) => {
  const session = useSession();
  const [selectedFood, setSelectedFood] = useState({ foodData });
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const storedMeal = localStorage.getItem("selectedMeal");
    if (storedMeal) {
      setMeal(storedMeal);
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
    return <p>Loading food details...</p>;
  }

  const firstServing = selectedFood?.servings?.serving[0];

  return (
    <div>
      <div className="flex justify-between text-lg items-center bg-gray-50 p-4">
        <Link href="/dashboard/search" className="mr-3">
          <ArrowLeft />
        </Link>
        <h2 className="font-semibold mr-3 ">
          {selectedFood?.food_name},
          {Math.round(firstServing?.metric_serving_amount)}
          {firstServing?.metric_serving_unit}
        </h2>
        <AddFoodButton
          firstServing={firstServing}
          selectedFood={selectedFood}
          session={session}
          meal={meal}
          foodName={selectedFood?.food_name}
        />
      </div>
      <div className="p-4">
        <FoodForm
          id={id}
          foodData={selectedFood}
          onUpdateFoodData={(newValues) => {
            setSelectedFood({ ...selectedFood, ...newValues });
          }}
        />
      </div>
    </div>
  );
};

export default FoodDetails;
