"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Edit,
  Save,
  Trash2,
  ArrowLeft,
  Calculator,
  Plus,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { getRecipe, updateRecipe, deleteRecipe } from "@/utils/handleRecipes";

const safeParseNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
};

const ingredientSchema = z.object({
  id: z.string(),
  foodName: z.string(),
  calories: z
    .union([z.string(), z.number()])
    .transform((val) => safeParseNumber(val)),
  carbohydrate: z
    .union([z.string(), z.number()])
    .transform((val) => safeParseNumber(val)),
  protein: z
    .union([z.string(), z.number()])
    .transform((val) => safeParseNumber(val)),
  fats: z
    .union([z.string(), z.number()])
    .transform((val) => safeParseNumber(val)),
  serving_amount: z
    .union([z.string(), z.number()])
    .transform((val) => safeParseNumber(val, 100)),
  metric_serving_unit: z.string().optional(),
  serving_description: z.string().optional(),
});

const editRecipeSchema = z.object({
  recipeName: z.string().min(1, { message: "Recipe name is required" }),
  ingredients: z.array(ingredientSchema),
});

const EditRecipeForm = () => {
  const [recipe, setRecipe] = useState(null);
  const [initialIngredients, setInitialIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [calculatedMacros, setCalculatedMacros] = useState({
    calories: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
  });

  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const recipeId = params.id;

  const form = useForm({
    resolver: zodResolver(editRecipeSchema),
    defaultValues: {
      recipeName: "",
      ingredients: [],
    },
  });

  const processIngredients = (ingredients) => {
    return ingredients.map((ingredient, index) => {
      const getServingAmount = (ing) => {
        const possibleAmounts = [
          ing.serving_amount,
          ing.servingAmount,
          ing.serving_qty,
          ing.servingQty,
          ing.serving_weight_grams,
          ing.nf_serving_weight_grams,
          ing.weight_grams,
        ];

        for (const amount of possibleAmounts) {
          const parsed = safeParseNumber(amount);
          if (parsed > 0) return parsed;
        }
        return 100;
      };

      return {
        id: ingredient.id || `ingredient-${index}`,
        foodName:
          ingredient.foodName ||
          ingredient.food_name ||
          ingredient.name ||
          "Unknown ingredient",
        calories: safeParseNumber(ingredient.calories),
        carbohydrate: safeParseNumber(ingredient.carbohydrate),
        protein: safeParseNumber(ingredient.protein),
        fats: safeParseNumber(ingredient.fats || ingredient.fat),
        serving_amount: getServingAmount(ingredient),
        metric_serving_unit:
          ingredient.metric_serving_unit || ingredient.serving_unit || "g",
        serving_description:
          ingredient.serving_description || `${getServingAmount(ingredient)}g`,
      };
    });
  };

  const calculateMacros = (currentIngredients) => {
    if (!Array.isArray(currentIngredients) || currentIngredients.length === 0) {
      return { calories: 0, carbohydrate: 0, protein: 0, fat: 0 };
    }

    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;

    currentIngredients.forEach((currentIngredient, index) => {
      const initialIngredient =
        initialIngredients.find(
          (initial) => initial.id === currentIngredient.id
        ) || initialIngredients[index];

      if (!initialIngredient) return;

      const newAmount = safeParseNumber(currentIngredient.serving_amount);
      const initialAmount = safeParseNumber(
        initialIngredient.serving_amount,
        1
      );

      if (initialAmount === 0) return;

      const initialCalories = safeParseNumber(initialIngredient.calories);
      const initialCarbs = safeParseNumber(initialIngredient.carbohydrate);
      const initialProtein = safeParseNumber(initialIngredient.protein);
      const initialFat = safeParseNumber(initialIngredient.fats);

      const newCalories = (newAmount * initialCalories) / initialAmount;
      const newCarbs = (newAmount * initialCarbs) / initialAmount;
      const newProteinValue = (newAmount * initialProtein) / initialAmount;
      const newFat = (newAmount * initialFat) / initialAmount;

      totalCalories += newCalories;
      totalCarbs += newCarbs;
      totalProtein += newProteinValue;
      totalFat += newFat;
    });

    return {
      calories: Math.round(totalCalories),
      carbohydrate: Math.round(totalCarbs),
      protein: Math.round(totalProtein),
      fat: Math.round(totalFat),
    };
  };

  const calculateIndividualMacros = (currentIngredient, index) => {
    const initialIngredient =
      initialIngredients.find(
        (initial) => initial.id === currentIngredient.id
      ) || initialIngredients[index];

    if (!initialIngredient) {
      return { calories: 0, carbs: 0, protein: 0, fat: 0 };
    }

    const newAmount = safeParseNumber(currentIngredient.serving_amount);
    const initialAmount = safeParseNumber(initialIngredient.serving_amount, 1);

    if (initialAmount === 0) {
      return { calories: 0, carbs: 0, protein: 0, fat: 0 };
    }

    const initialCalories = safeParseNumber(initialIngredient.calories);
    const initialCarbs = safeParseNumber(initialIngredient.carbohydrate);
    const initialProtein = safeParseNumber(initialIngredient.protein);
    const initialFat = safeParseNumber(initialIngredient.fats);

    return {
      calories: Math.round((newAmount * initialCalories) / initialAmount),
      carbs: Math.round((newAmount * initialCarbs) / initialAmount),
      protein: Math.round((newAmount * initialProtein) / initialAmount),
      fat: Math.round((newAmount * initialFat) / initialAmount),
    };
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name?.includes("ingredients") && initialIngredients.length > 0) {
        const currentIngredients = value.ingredients;
        if (currentIngredients && currentIngredients.length > 0) {
          const newMacros = calculateMacros(currentIngredients);
          setCalculatedMacros(newMacros);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [initialIngredients]);

  useEffect(() => {
    const loadRecipe = async () => {
      if (status === "loading") return;

      if (!session) {
        router.push("/signin");
        return;
      }

      try {
        setIsLoading(true);
        const response = await getRecipe(recipeId);
        const recipeData = response.recipe;

        setRecipe(recipeData);

        let processedIngredients = [];

        if (recipeData.ingredients && Array.isArray(recipeData.ingredients)) {
          processedIngredients = processIngredients(recipeData.ingredients);
        }

        setInitialIngredients([...processedIngredients]);

        form.reset({
          recipeName: recipeData.name,
          ingredients: processedIngredients,
        });

        const initialMacros = calculateMacros(processedIngredients);
        setCalculatedMacros(initialMacros);
      } catch (error) {
        console.error("Error loading recipe:", error);
        toast({
          title: "Error!",
          description: "Failed to load recipe",
          variant: "destructive",
        });
        router.push("/dashboard/createMeal");
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [recipeId, session, status, router, form, toast]);

  const handleUpdateRecipe = async (data) => {
    setIsUpdating(true);

    try {
      const processedIngredients = data.ingredients.map((ingredient) => ({
        ...ingredient,
        calories: safeParseNumber(ingredient.calories),
        carbohydrate: safeParseNumber(ingredient.carbohydrate),
        protein: safeParseNumber(ingredient.protein),
        fats: safeParseNumber(ingredient.fats),
        serving_amount: safeParseNumber(ingredient.serving_amount, 100),
      }));

      await updateRecipe(
        recipeId,
        data.recipeName,
        processedIngredients,
        calculatedMacros.calories,
        calculatedMacros.carbohydrate,
        calculatedMacros.protein,
        calculatedMacros.fat
      );

      toast({
        title: "Success!",
        description: "Recipe updated successfully with new ingredient amounts",
        variant: "default",
      });

      router.push("/dashboard/createMeal");
    } catch (error) {
      console.error("Error updating recipe:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      toast({
        title: "Error!",
        description: `Failed to update recipe: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteRecipe = async () => {
    setIsDeleting(true);

    try {
      await deleteRecipe(recipeId);

      toast({
        title: "Success!",
        description: "Recipe deleted successfully",
        variant: "default",
      });

      router.push("/dashboard/createMeal");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      toast({
        title: "Error!",
        description: `Failed to delete recipe: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const updateIngredientAmount = (index, newAmount) => {
    const currentIngredients = form.getValues("ingredients");
    const updatedIngredients = [...currentIngredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      serving_amount: safeParseNumber(newAmount, 0),
    };

    form.setValue("ingredients", updatedIngredients);

    if (initialIngredients.length > 0) {
      const newMacros = calculateMacros(updatedIngredients);
      setCalculatedMacros(newMacros);
    }
  };

  const removeIngredient = (index) => {
    const currentIngredients = form.getValues("ingredients");
    const newIngredients = currentIngredients.filter((_, i) => i !== index);

    const newInitialIngredients = initialIngredients.filter(
      (_, i) => i !== index
    );
    setInitialIngredients(newInitialIngredients);

    form.setValue("ingredients", newIngredients);

    if (newInitialIngredients.length > 0 && newIngredients.length > 0) {
      const newMacros = calculateMacros(newIngredients);
      setCalculatedMacros(newMacros);
    } else {
      setCalculatedMacros({ calories: 0, carbohydrate: 0, protein: 0, fat: 0 });
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Recipe not found</p>
        <Button
          onClick={() => router.push("/dashboard/createMeal")}
          className="mt-4"
        >
          Back to Recipes
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Edit className="w-6 h-6 mr-2" />
            Edit Recipe Amounts
          </h1>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete &quot;{recipe.name}&quot;? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteRecipe}>
                Delete Recipe
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateRecipe)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="recipeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isUpdating} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Label className="text-lg font-semibold">Ingredient Amounts</Label>
            <div className="grid gap-4">
              {form.watch("ingredients").map((ingredient, index) => {
                const individualMacros = calculateIndividualMacros(
                  ingredient,
                  index
                );

                return (
                  <Card key={ingredient.id || index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {ingredient.foodName}
                        </h3>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeIngredient(index)}
                        disabled={
                          isUpdating || form.watch("ingredients").length <= 1
                        }
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Label className="text-sm">Amount (grams)</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const currentAmount = safeParseNumber(
                                ingredient.serving_amount
                              );
                              const newAmount = Math.max(0, currentAmount - 1);
                              updateIngredientAmount(index, newAmount);
                            }}
                            disabled={isUpdating}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={ingredient.serving_amount}
                            onChange={(e) =>
                              updateIngredientAmount(
                                index,
                                safeParseNumber(e.target.value)
                              )
                            }
                            min="0"
                            step="1"
                            className="w-24 text-center"
                            disabled={isUpdating}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const currentAmount = safeParseNumber(
                                ingredient.serving_amount
                              );
                              const newAmount = currentAmount + 1;
                              updateIngredientAmount(index, newAmount);
                            }}
                            disabled={isUpdating}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-gray-500">grams</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <Label className="text-sm">Calculated Amount</Label>
                        <div className="text-sm text-gray-600 mt-1">
                          {individualMacros.calories} cal
                          <br />
                          {individualMacros.carbs}g carbs
                          <br />
                          {individualMacros.protein}g protein
                          <br />
                          {individualMacros.fat}g fat
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Updated Recipe Totals (Real-time)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {calculatedMacros.calories}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">Calories</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {calculatedMacros.carbohydrate}g
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">Carbs</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {calculatedMacros.protein}g
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">Protein</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {calculatedMacros.fat}g
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">Fat</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isUpdating ? "Saving..." : "Save Recipe"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditRecipeForm;
