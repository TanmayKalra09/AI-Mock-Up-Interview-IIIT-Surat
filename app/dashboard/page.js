"use client";
import React from "react";
import AddNewInterview from "./components/AddNewInterview";
import Logo from "../_components/Logo";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: "url('72.webp')" }}
    >
      {/* Main content */}
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="h-20 flex justify-between items-center shadow-md bg-white/90 px-6 z-10">
          <Logo />
          <div className="flex gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer">
              Premium
            </Button>
            <Button
              onClick={handleSignOut}
              className="bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-grow p-10">
          <h1 className="font-bold text-2xl text-purple-700">Dashboard</h1>
          <h1 className="text-purple-600">Create and Start your AI Mockup Interview</h1>

          {/* Add Interview Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
            <AddNewInterview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
