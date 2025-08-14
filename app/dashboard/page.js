"use client"
import React, { useEffect, useState } from 'react'
import AddNewInterview from './_components/AddNewInterview'
import Logo from '../_components/Logo'
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ensureAuthenticated = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.replace("/");
      }
      setLoading(false);
    };
    ensureAuthenticated();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };
  return (
    <div>
      <div className="h-screen overflow-hidden flex flex-col">
        <div className="h-20 flex justify-between items-center bg-white/90 px-6 z-10">
          <Logo />
          <div className="flex gap-4">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer"
              onClick={() => router.push('/premium')}
            >
              Premium
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
        <div className="flex-grow p-10 flex  justify-between">
          {loading ? (
            <div className="text-black">Loading...</div>
          ) : (
          <div>
            <h1 className="font-bold text-2xl text-black">
              Welcome to your <span className="text-purple-700">Dashboard</span>
            </h1>
            <h1 className='text-purple-600'>Create and Start your AI Mockup Interview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
              <AddNewInterview/>
            </div>
          </div>
          )}
          <img 
            src="/2456062 2.jpg" 
            alt="AI Mock Interview" 
            className="w-1/2 h-auto object-cover my-10 mt-[-50px] mr-10 flex justify-center"
          />
        </div>
      </div>
    </div>
  )
}

export default page