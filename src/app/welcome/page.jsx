import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className=" h-screen flex flex-col items-center justify-center bg-[url('/images/food2.jpg')] bg-cover">
      <div className="bg-white bg-opacity-45 p-20 rounded-md font-semibold">
        <div className="flex flex-col items-center ">
          <h1 className="lg:text-4xl text-2xl ">My Daily Macros</h1>
          <h2 className="lg:text-2xl text-xl ">Welcome</h2>
          <img src="/images/logo.png" />
        </div>
        <div className="flex justify-between gap-20 text-base lg:text-xl">
          <div className="flex flex-col items-center space-y-4">
            <p>Already have an account</p>
            <Link href="/signIn">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <p>Create an account</p>
            <Link href="/signUp">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
