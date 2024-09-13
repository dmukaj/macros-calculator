"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postUsersData, getUsersData } from "@/utils/usersData";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/hooks/use-toast";
import Result from "./Result";
import { calculateBMR } from "@/utils/calculateMacros";
import { useEffect, useState } from "react";

const formSchema = z.object({
  age: z.coerce
    .number({
      invalid_type_error: "Age must be a number",
    })
    .min(1, { message: "Age must be greater than 0" }),
  height: z.coerce.number({
    invalid_type_error: "Height must be a number",
  }),
  weight: z.coerce.number({
    required_error: "Weight is required",
    invalid_type_error: "Weight must be a number",
  }),
  activity: z.string().min(1, { message: "Please select your goal" }),
  goal: z.string().min(1, { message: "Please select your goal" }),
  gender: z.string().min(1, { message: "Please select your gender" }),
});

export default function Calculator() {
  const [userData, setUserData] = useState(null);
  const [bmr, setBmr] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      activity: "",
      age: 25,
      gender: "",
      goal: "",
      height: 66,
      weight: 150,
    },
  });

  const onSubmit = async (values, event) => {
    event.preventDefault();
    const macros = await calculateBMR(values);
    setBmr(macros);

    const response = await postUsersData({ ...values, bmr: macros });

    if (response === 201) {
      toast({
        title: "Success!",
        description: "You can view your results in the dashboard",
        variant: "success",
      });
    }
    if (response === 500) {
      toast({
        title: "Uh oh!",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const loadUserData = async () => {
    const { user } = await getUsersData();

    if (user) {
      let { age, height, weight, gender, activity, goal, bmr } = user;
      goal = goal.toString();
      gender = gender.toString();
      activity = activity.toString();
      setUserData({ age, height, weight, gender, activity, goal });
      setBmr(bmr);

      form.reset({
        activity: activity,
        age: age,
        gender: gender,
        goal: goal,
        height: height,
        weight: weight,
      });
    }
  };

  useEffect(() => {
    loadUserData();
  }, [form.reset, bmr]);

  return (
    <>
      <div className="flex flex-col items-center text-lg lg:text-2xl font-bold text-gray-800">
        <h1> Macros Calculator</h1>
      </div>
      <Form {...form} className="w-[70vw]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-10 space-y-8">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="age" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={userData?.gender}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            userData?.gender || "Select your gender?"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unknown">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your height in inches"
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your weight in pounds"
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={userData?.activity || field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          userData?.activity || "Select your activity level"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sedentary">
                      Sedentary:Little or no exercise
                    </SelectItem>
                    <SelectItem value="Light">
                      Light: Exercise 1-3 times a week
                    </SelectItem>
                    <SelectItem value="Moderate">
                      Moderate: Exercise 3-4 times a week
                    </SelectItem>
                    <SelectItem value="Very Active">
                      Very Active: Exercise heavy 5-6 times a week
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={userData?.goal || "Select goal"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Maintain weight">
                      Maintain weight
                    </SelectItem>
                    <SelectItem value="Lose weight">Lose weight</SelectItem>
                    <SelectItem value="Gain weight">Gain weight</SelectItem>
                    <SelectItem value="Gain muscle">Gain muscle</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline">
            Calculate
          </Button>
        </form>
      </Form>
      {bmr && <Result bmr={bmr} />}
    </>
  );
}
