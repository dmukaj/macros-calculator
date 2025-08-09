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
import { useEffect } from "react";
import { useFood } from "@/context/FoodContext";
import SelectMeal from "../app/dashboard/search/SelectMeal";

export default function FoodForm({
  calculatedValues,
  setCalculatedValues,
  meal,
  setMeal,
}) {
  const { selectedFood } = useFood();
  const selectedRecipe = selectedFood;

  let firstServing;
  if (selectedFood?.servings?.serving.length > 0) {
    firstServing = selectedFood?.servings?.serving[0];
  }

  useEffect(() => {
    const storedMeal = localStorage.getItem("selectedMeal");
    if (storedMeal) {
      setMeal(storedMeal);
    }

    setCalculatedValues((prevState) => ({
      ...prevState,
      id: selectedFood?.food_id,
      foodName: selectedFood?.food_name,
      calories: Math.round(firstServing?.calories || selectedRecipe?.calories),
      protein: Math.round(firstServing?.protein || selectedRecipe?.protein),
      carbohydrate: Math.round(
        firstServing?.carbohydrate || selectedRecipe?.carbohydrate
      ),
      fats: Math.round(firstServing?.fat || selectedRecipe?.fat),
      serving_amount: Math.round(firstServing?.metric_serving_amount || 1),
      metric_serving_unit: firstServing?.metric_serving_unit || "g",
      serving_description: firstServing?.serving_description || "",
    }));
  }, []);

  const metricServingAmount =
    Math.round(firstServing?.metric_serving_amount) || 1;

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      foodName: selectedFood.food_name,
      amount: metricServingAmount,
      servingUnit: firstServing?.metric_serving_unit || "",
      numberOfServings: 1,
      meal: meal || "",
    },
  });

  const calculateTotalMacros = (amount, numberOfServings) => {
    const metricServing = metricServingAmount;
    const initialCalories = firstServing?.calories || selectedRecipe?.calories;
    const initialProtein = firstServing?.protein || selectedRecipe?.protein;
    const initialCarbs =
      firstServing?.carbohydrate || selectedRecipe?.carbohydrate;
    const initialFats = firstServing?.fat || selectedRecipe?.fat;

    const calories = Math.round(
      ((amount * initialCalories) / metricServing) * numberOfServings
    );

    const protein = Math.round(
      ((amount * initialProtein) / metricServing) * numberOfServings
    );

    const carbohydrate = Math.round(
      ((amount * initialCarbs) / metricServing) * numberOfServings
    );

    const fats = Math.round(
      ((amount * initialFats) / metricServing) * numberOfServings
    );

    const newValues = {
      id: selectedFood?.food_id || selectedRecipe?.id,
      foodName: selectedFood?.food_name || selectedRecipe?.name,
      calories,
      protein,
      carbohydrate,
      fats,
      serving_amount:
        selectedFood?.serving_amount || selectedRecipe?.serving_amount,
      metric_serving_unit:
        selectedFood?.metric_serving_unit ||
        selectedRecipe?.metric_serving_unit,
      serving_description:
        selectedFood?.serving_description ||
        selectedRecipe?.serving_description,
    };

    setCalculatedValues(newValues);
  };

  const onSubmit = (e) => {
    const { name } = e.target;
    const { amount, numberOfServings } = form.getValues();
    if (name === "numberOfServings" || name === "amount")
      calculateTotalMacros(amount, numberOfServings);
  };

  return (
    <div className="p-2">
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
                    {selectedFood?.servings?.serving.length > 1
                      ? selectedFood?.servings?.serving.map((serving) => (
                          <SelectItem
                            key={serving.serving_id}
                            value={serving.measurement_description}
                          >
                            {serving.measurement_description}
                          </SelectItem>
                        ))
                      : null}
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
                <SelectMeal
                  onValueChange={field.onChange}
                  mealType={meal}
                  setMeal={setMeal}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-row justify-around items-center gap-2 text-sm">
        <div>
          <PieChartComponent
            width={110}
            height={110}
            totalCalories={calculatedValues?.calories}
            protein={calculatedValues?.protein}
            carbohydrate={calculatedValues?.carbohydrate}
            fats={calculatedValues?.fats}
          />
        </div>
        <div className="flex gap-1 p-2  bg-secondary/20 rounded-lg text-[hsl(var(--chart-1))]">
          <h2>Protein</h2>
          <h3>{calculatedValues.protein || selectedRecipe.protein}</h3>
        </div>
        <div className="flex gap-1 p-2 bg-secondary/20 rounded-lg text-[hsl(var(--chart-3))]">
          <h2>Carbs</h2>
          <h3>
            {calculatedValues.carbohydrate || selectedRecipe.carbohydrate}
          </h3>
        </div>
        <div className="flex gap-1 p-2 bg-secondary/20 rounded-lg text-[hsl(var(--chart-2))]">
          <h2>Fats</h2>
          <h3>{calculatedValues.fats || selectedRecipe.fat}</h3>
        </div>
      </div>
    </div>
  );
}
