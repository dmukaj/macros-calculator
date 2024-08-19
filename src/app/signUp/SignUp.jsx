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
import animationData from "../../../src/lottiefiles/signup";
import { registerSchema } from "@/lib/schema";
import axios from "axios";
import { loginWithCreds } from "@/actions/auth";

export default function SignUp() {
  const handleSubmit = async (data) => {
    try {
      const response = await axios.post("/api/auth/register", data);

      console.log("User created successfully", data);
      if (response.status === 200 || response.status === 201) {
        await loginWithCreds({
          email: data.email,
          password: data.password,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data || error.message);
    }
  };

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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
          <h1>Create new Account</h1>
        </div>
        <Form {...form} className="w-[70vw]">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="p-10 space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" type="name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant="outline">
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
