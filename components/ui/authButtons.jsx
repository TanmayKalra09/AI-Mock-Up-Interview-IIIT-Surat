"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting Google sign in...");
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });
      
      if (result?.error) {
        console.error("Sign in error:", result.error);
        setError(result.error);
      } else {
        console.log("Sign in successful:", result);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-16 py-3 text-lg rounded-lg shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <Image src={googleLogo} alt="Google" width={24} height={24} />
            <span>Sign in with Google</span>
          </>
        )}
      </button>
      {error && (
        <p className="mt-4 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}

