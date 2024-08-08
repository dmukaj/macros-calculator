"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  age: z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  }),
  height: z.number({
    required_error: "Height is required",
    invalid_type_error: "Height must be a number",
  }),
  weight: z.number({
    required_error: "Weight is required",
    invalid_type_error: "Weight must be a number",
  }),
  activity: z.string().min(1, { message: "Please select your goal" }),
  goal: z.string().min(1, { message: "Please select your goal" }),
});

export default function Calculator() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      height: "",
      activity: "",
      weight: "",
      goal: "",
    },
  });
  const onSubmit = (data) => console.log(data);

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
            render={() => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" type="number" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <RadioGroup defaultValue="gender">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="r2" />
              <Label htmlFor="r2">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="r3" />
              <Label htmlFor="r3">Female</Label>
            </div>
          </RadioGroup>
          <FormField
            control={form.control}
            name="height"
            render={() => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input placeholder="your height in inches" type="number" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={() => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="your weight in pounds" type="number" />
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
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your activity level?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sedetary">
                      Sedetary:Little or no exercise
                    </SelectItem>
                    <SelectItem value="Light">
                      Light: Exercise 1-3 times a week
                    </SelectItem>
                    <SelectItem value="Moderate">
                      Moderate: Exercise 3-4 times a week
                    </SelectItem>
                    <SelectItem value="Active">
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
                      <SelectValue placeholder="Select your goal?" />
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
    </>
  );
}
