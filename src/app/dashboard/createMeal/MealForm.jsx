"use client";
import { addToRecipe } from "@/utils/addToRecipe";
import { Button } from "@/components/ui/button";
import { CookingPot } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useIngredients } from "@/context/IngredientsContext";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchPage from "../search/Search";

const MealForm = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const {
    ingredients,
    totalCalories,
    totalCarbs,
    totalProtein,
    totalFats,
    handleAddIngredient,
  } = useIngredients();

  const { toast } = useToast();
  const session = useSession();

  const formSchema = z.object({
    recipeName: z.string().min(1, { message: "Recipe name is required" }),
    ingredients: z.array(
      z.object({
        food_name: z.string(),
      })
    ),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      recipeName: "",
      ingredients: [],
    },
  });
  const recipeName = form.getValues("recipeName");
  const foodNames = ingredients.map((ingredient) => ingredient.foodName);
  const handleAddToRecipe = async () => {
    try {
      if (ingredients.length === 0) {
        toast({
          title: "Error!",
          description: "Please add ingredients to the recipe",
          variant: "destructive",
        });
        return;
      }

      await addToRecipe(
        session.data.user._id,
        recipeName,
        foodNames,
        totalCalories,
        totalCarbs,
        totalProtein,
        totalFats
      );

      toast({
        title: "Success!",
        description: "Recipe added successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast({
        title: "Error!",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  const onSubmit = () => {
    handleAddIngredient(ingredients);
  };
  return (
    <div>
      <div className="flex justify-end ">
        <Button onClick={handleAddToRecipe}>
          <CookingPot className="mr-3" />
          <span>Create Recipe</span>
        </Button>
      </div>
      <Form {...form} className="w-[50vw]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="recipeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Name</FormLabel>
                <FormControl>
                  <Input type="string" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Add Ingredients</FormLabel>

                <SearchPage
                  setQuery={setQuery}
                  setResult={setResult}
                  result={result}
                  {...field}
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default MealForm;
