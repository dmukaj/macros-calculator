import { Card, CardContent } from "@/components/ui/card";
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
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-white sm:size-20">
                <img className="h-16 sm:h-20" src="/images/logo.png" />
              </span>

              <h1 className="mt-2 text-2xl font-bold text-foreground/80 sm:text-3xl md:text-4xl">
                Welcome to My Daily Macros
              </h1>

              <p className="mt-4 leading-relaxed text-foreground/60">
                My Daily Macros is a platform that helps you track your daily
                macros. It provides a simple and user-friendly interface to help
                you monitor your macronutrient intake and make informed food
                choices.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-auto mt-20 max-w-md">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Hi There!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign in to your account or create a new one
                </p>
              </div>

              <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Tabs defaultValue="sign-in" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-slate-700">
                      <TabsTrigger
                        value="sign-in"
                        className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
                      >
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger
                        value="sign-up"
                        className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
                      >
                        Sign Up
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="sign-in" className="mt-0">
                      <SignIn />
                    </TabsContent>

                    <TabsContent value="sign-up" className="mt-0">
                      <SignUp />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Welcome;
