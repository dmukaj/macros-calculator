"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Lottie from "react-lottie";
import animationData from "../../../src/lottiefiles/signIn";

const formSchema = z.object({
  email: z.string().min(1, { message: "Please select your goal" }),
  password: z.string().min(1, { message: "Please select your goal" }),
});

export default function SignIn() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center p-20  h-screen">
      <div className=" border-2 shadow-lg p-20 rounded-lg">
        <div>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
        <div className="flex flex-col items-center text-xl font-semibold">
          <h1>Sign In</h1>
        </div>
        <Form {...form} className="w-[70vw]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-10 space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@domain.com" type="email" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={() => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant="outline">
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
