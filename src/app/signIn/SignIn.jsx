"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import animationData from "../../../src/lottiefiles/signin";
import { loginWithCreds } from "@/actions/auth";
import { signInSchema } from "@/lib/schema";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data) => {
    const result = await loginWithCreds(data);
    setError(result);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-[800px]">
      <div className="">
        <div>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
        <div className="flex flex-col items-center text-xl text-black lg:text-2xl font-semibold">
          <h1>Sign In</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="p-2 w-full space-y-8 text-black"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@domain.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              variant="outline"
              className="text-black dark:text-white"
            >
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
