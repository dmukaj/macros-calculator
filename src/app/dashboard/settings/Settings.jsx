"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, LogOut, ArrowLeft } from "lucide-react";
import { logout } from "@/actions/auth";
import { useSession } from "next-auth/react";

export default function Settings() {
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      // The logout action should handle the redirect
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggingOut(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Hello {session?.user?.name}
          </CardTitle>
          <CardDescription>
            Are you sure you want to sign out of your account?
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoggingOut ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing out...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Yes, Sign me out
                </div>
              )}
            </Button>

            <Button
              onClick={handleGoBack}
              variant="outline"
              disabled={isLoggingOut}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel, take me back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
