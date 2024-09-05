"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PieChartComponent from "@/components/PieChartComponent";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import SelectMeal from "./SelectMeal";

export default function FoodForm({
  foodData,
  calculatedValues,
  setCalculatedValues,
}) {
  const [selectedFood] = useState(foodData);
  const firstServing = selectedFood?.servings?.serving[0];

  const [meal, setMeal] = useState("");

  useEffect(() => {
    const storedMeal = localStorage.getItem("selectedMeal");
    if (storedMeal) {
      setMeal(storedMeal);
    }

    setCalculatedValues((prevState) => ({
      ...prevState,
      calories: Math.round(firstServing.calories),
      protein: Math.round(firstServing.protein),
      carbs: Math.round(firstServing.carbohydrate),
      fats: Math.round(firstServing.fat),
    }));
  }, []);

  const form = useForm({
    resolver: zodResolver(),

    defaultValues: {
      foodName: selectedFood.food_name,
      amount: firstServing.metric_serving_amount
        ? Math.round(firstServing.metric_serving_amount)
        : Math.round(firstServing.number_of_units),
      servingUnit: firstServing.metric_serving_unit,
      numberOfServings: 1,
      meal: meal || "",
    },
  });

  const calculateMacros = (amount, numberOfServings) => {
    const metricServing = firstServing.metric_serving_amount
      ? Math.round(firstServing.metric_serving_amount)
      : Math.round(firstServing.number_of_units);

    const initialCalories = firstServing.calories;
    const initialProtein = firstServing.protein;
    const initialCarbs = firstServing.carbohydrate;
    const initialFats = firstServing.fat;

    const calories = Math.round(
      ((amount * initialCalories) / metricServing) * numberOfServings
    );

    const protein = Math.round(
      ((amount * initialProtein) / metricServing) * numberOfServings
    );

    const carbs = Math.round(
      ((amount * initialCarbs) / metricServing) * numberOfServings
    );

    const fats = Math.round(
      ((amount * initialFats) / metricServing) * numberOfServings
    );

    const newValues = {
      calories,
      protein,
      carbs,
      fats,
    };

    setCalculatedValues(newValues);
    // console.log("newValues", newValues);
  };

  const onSubmit = (e) => {
    const { name } = e.target;
    const { amount, numberOfServings } = form.getValues();
    if (name === "numberOfServings" || name === "amount")
      calculateMacros(amount, numberOfServings);
  };

  return (
    <div className="p-4 ">
      <Form {...form}>
        <form onChange={onSubmit}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-2/3">Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serving-unit"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-1/2">Serving Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select serving size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedFood?.servings?.serving.map((serving) => (
                      <SelectItem
                        key={serving.serving_id}
                        value={serving.measurement_description}
                      >
                        {serving.measurement_description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfServings"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-2/3">Number of Servings</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meal"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-1/3">Meal</FormLabel>
                <SelectMeal onValueChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-row justify-around items-center gap-4">
        <div>
          <PieChartComponent
            width={120}
            height={120}
            totalCalories={calculatedValues?.calories}
            protein={calculatedValues?.protein}
            carbs={calculatedValues?.carbs}
            fats={calculatedValues?.fats}
          />
        </div>
        <div>
          <h2 className="text-[hsl(var(--chart-1))]">Protein</h2>
          <h3>{calculatedValues.protein}</h3>
        </div>
        <div>
          <h2 className="text-[hsl(var(--chart-3))]">Carbs</h2>
          <h3>{calculatedValues.carbs}</h3>
        </div>
        <div>
          <h2 className="text-[hsl(var(--chart-2))]">Fats</h2>
          <h3>{calculatedValues.fats}</h3>
        </div>
      </div>
    </div>
  );
}
