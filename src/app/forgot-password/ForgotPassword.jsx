"use client";

import { useState, useTransition } from "react";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/hooks/use-toast";
import { resetPassword } from "@/actions/reset-password";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handlePasswordReset = (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(data).then((result) => {
        setError(result.error);

        setSuccess(result.success);
        toast({
          title: "Success!",
          description: result.success,
          variant: "success",
        });
      });
    });
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-[800px] text-foreground">
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Mail className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-green-600">Email Sent!</h2>
          <p className="text-gray-600">
            We&apos;ve sent a password reset link to{" "}
            <strong>{form.getValues("email")}</strong>. Please check your inbox
            and follow the instructions to reset your password.
          </p>
          <Button
            onClick={() => {
              setError("");
              setSuccess("");
              form.reset();
              router.push("/welcome");
            }}
            variant="outline"
            className="w-full"
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  // Main forgot password form
  return (
    <div className="flex flex-col items-center justify-center p-8 h-[800px] text-foreground">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>
          <p className="text-gray-600 mb-6">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(handlePasswordReset)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="reset-email"
              className="block text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <Input
              id="reset-email"
              type="email"
              placeholder="user@domain.com"
              disabled={isPending}
              {...form.register("email")}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push("/welcome")}
            className="w-full"
          >
            Back to Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
