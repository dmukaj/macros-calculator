import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";

const Welcome = () => {
  return (
    <section className="bd-white">
      <div className=" lg:grid lg:min-h-screen lg:grid-cols-12 ">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/images/food1.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <span className="block text-white">
              <img className="h-16 lg:h-24" src="/images/logo.png" />
            </span>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to My Daily Macros
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              My Daily Macros is a platform that helps you track your daily
              macros. It provides a simple and user-friendly interface to help
              you monitor your macronutrient intake and make informed food
              choices.
            </p>
          </div>
        </section>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl flex flex-col items-center justify-center">
            <div className="relative -mt-16 block lg:hidden">
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20">
                <img className="h-16 sm:h-20" src="/images/logo.png" />
              </span>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to My Daily Macros
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                My Daily Macros is a platform that helps you track your daily
                macros. It provides a simple and user-friendly interface to help
                you monitor your macronutrient intake and make informed food
                choices.
              </p>
            </div>
            <div className="flex items-center justify-center w-auto bg-white mt-20">
              <Tabs defaultValue="sign-in" className="w-auto">
                <TabsList className="grid w-full grid-cols-2 bg-gray-200">
                  <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                  <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="sign-in">
                  <Card className="bg-white">
                    <SignIn />
                  </Card>
                </TabsContent>
                <TabsContent value="sign-up">
                  <Card className="bg-white">
                    <SignUp />
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Welcome;
