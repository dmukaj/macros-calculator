import { fetchMealTypeByDate } from "./fetchMealType";

export default async function calculateMacros(date) {
  const foodData = await fetchMealTypeByDate(date);
  if (!foodData || !Array.isArray(foodData.response)) {
    return null;
  }

  const totalCalories = getCaloriesPerDay(foodData);
  const totalProtein = getProteinPerDay(foodData);
  const totalCarbs = getCarbsPerDay(foodData);
  const totalFats = getFatsPerDay(foodData);

  return {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFats,
  };
}

function getCaloriesPerDay(foodData) {
  const caloriesPerDay = foodData.response.map((item) => item.calories || 0);
  return caloriesPerDay.reduce((acc, item) => acc + item, 0);
}

function getProteinPerDay(foodData) {
  const proteinPerDay = foodData.response.map((item) => item.protein || 0);
  return proteinPerDay.reduce((acc, item) => acc + item, 0);
}

function getCarbsPerDay(foodData) {
  const carbsPerDay = foodData.response.map((item) => item.carbs || 0);
  return carbsPerDay.reduce((acc, item) => acc + item, 0);
}

function getFatsPerDay(foodData) {
  const fatsPerDay = foodData.response.map((item) => item.fat || 0);
  return fatsPerDay.reduce((acc, item) => acc + item, 0);
}
