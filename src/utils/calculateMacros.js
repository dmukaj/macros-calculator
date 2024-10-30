import { fetchMealTypeByDate } from "./fetchMealType";

export async function calculateTotalMacros(date) {
  const foodData = await fetchMealTypeByDate(date);

  if (!foodData || !Array.isArray(foodData)) {
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
  const caloriesPerDay = foodData.map((item) => item.calories || 0);
  return caloriesPerDay.reduce((acc, item) => acc + item, 0);
}

function getProteinPerDay(foodData) {
  const proteinPerDay = foodData.map((item) => item.protein || 0);
  return proteinPerDay.reduce((acc, item) => acc + item, 0);
}

function getCarbsPerDay(foodData) {
  const carbsPerDay = foodData.map((item) => item.carbohydrate || 0);
  return carbsPerDay.reduce((acc, item) => acc + item, 0);
}

function getFatsPerDay(foodData) {
  const fatsPerDay = foodData.map((item) => item.fat || 0);
  return fatsPerDay.reduce((acc, item) => acc + item, 0);
}

export const calculateBMR = async (data) => {
  const age = data.age;
  const height = data.height;
  const weight = data.weight;
  const gender = data.gender;
  const activity = data.activity;
  const goal = data.goal;

  let BMR;
  if (gender === "male") {
    BMR = Math.round(66 + 6.23 * weight + 12.7 * height - 6.8 * age);
  } else if (gender === "female" || gender === "unknown") {
    BMR = Math.round(655 + 4.35 * weight + 4.7 * height - 4.7 * age);
  }

  switch (activity) {
    case "Sedentary":
      BMR *= 1.2;
      break;
    case "Light":
      BMR *= 1.375;
      break;
    case "Moderate":
      BMR *= 1.55;
      break;
    case "Very Active":
      BMR *= 1.725;
      break;
    default:
      return (BMR *= 1);
  }

  switch (goal) {
    case "Maintain weight":
      break;
    case "Lose weight":
      BMR *= 0.8;
      break;
    case "Gain weight":
      BMR *= 1.15;
      break;
    case "Gain muscle":
      BMR *= 1.1;
      break;
    default:
      return (BMR *= 1);
  }

  return Math.round(BMR);
};

export const calculateMacros = (bmr) => {
  const calories = parseInt(bmr);

  const protein = Math.round((bmr * 0.3) / 4);
  const carbohydrate = Math.round((bmr * 0.3) / 4);
  const fats = Math.round((bmr * 0.3) / 9);

  return { calories, protein, carbohydrate, fats };
};
