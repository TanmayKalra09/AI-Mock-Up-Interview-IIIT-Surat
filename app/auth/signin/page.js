"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SignIn() {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/dashboard",
      prompt: "select_account",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf6]">
      <div className="flex flex-row items-center justify-center max-w-4xl w-full space-x-8">
        <div className="hidden md:block w-[1500px] max-w-none mr-32">
          <Image
            src="/Computer login-amico.png" 
            alt="Sign In Illustration"
            width={1500}
            height={1500}
            className="object-cover h-auto w-full"
          />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-8 text-purple-600">Sign In</h1>
          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Image
                src="/google-logo-on-transparent-white-background-free-vector-removebg-preview.png"
                alt="Google"
                width={20}
                height={20}
              />
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}