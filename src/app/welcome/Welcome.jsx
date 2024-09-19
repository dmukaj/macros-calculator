import { Button } from "@/components/ui/button";
import Link from "next/link";

const Welcome = () => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center bg-[url('/images/food.jpg')] bg-cover">
      <div className=" bg-black  bg-opacity-65 p-20 rounded-md font-semibold">
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
};

export default Welcome;
