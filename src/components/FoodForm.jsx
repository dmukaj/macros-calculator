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
import { useState } from "react";

const FoodDetails = ({ foodData }) => {
  const [selectedFood] = useState(foodData); // Use the context to access selectedFood
  const [calculatedValues, setCalculatedValues] = useState({
    calories: selectedFood.servings.serving[1].calories,
    protein: selectedFood.servings.serving[1].protein,
    carbs: selectedFood.servings.serving[1].carbohydrate,
    fats: selectedFood.servings.serving[1].fat,
  });

  const form = useForm({
    resolver: zodResolver(),

    defaultValues: {
      foodName: "",
      amount: "",
      servingUnit: "",
      numberOfServings: "",
      meal: "",
    },
  });

  const calculateMacros = (amount, numberOfServings) => {
    const metricServing = Math.round(
      selectedFood.servings.serving[1].metric_serving_amount
    );

    const initialCalories = selectedFood.servings.serving[1].calories;
    const initialProtein = selectedFood.servings.serving[1].protein;
    const initialCarbs = selectedFood.servings.serving[1].carbohydrate;
    const initialFats = selectedFood.servings.serving[1].fat;

    const calories =
      ((amount * initialCalories) / metricServing) * numberOfServings;

    const protein =
      ((amount * initialProtein) / metricServing) * numberOfServings;

    const carbs = parseInt(
      ((amount * initialCarbs) / metricServing) * numberOfServings
    );

    const fats = ((amount * initialFats) / metricServing) * numberOfServings;

    console.log(
      "Calories",
      calories,
      "Protein",
      protein,
      "Carbs",
      carbs,
      "Fats",
      fats
    );

    setCalculatedValues({
      calories,
      protein,
      carbs,
      fats,
    });
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Dinner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>

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
            totalCalories={calculatedValues.calories}
            protein={calculatedValues.protein}
            carbs={calculatedValues.carbs}
            fats={calculatedValues.fats}
          />
        </div>
        <div>
          <h2>Protein</h2>
          <h3>{calculatedValues.protein}</h3>
        </div>
        <div>
          <h2>Carbs</h2>
          <h3>{calculatedValues.carbs}</h3>
        </div>
        <div>
          <h2>Fats</h2>
          <h3>{calculatedValues.fats}</h3>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
