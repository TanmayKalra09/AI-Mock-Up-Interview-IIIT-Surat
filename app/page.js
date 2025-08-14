"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "./_components/Logo";
import { useRouter } from "next/navigation";
import Footer from "./_components/Footer";
import { supabase } from "@/utils/supabaseClient";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.replace("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });
    if (error) {
      console.error(error);
    }
  };

  return (
    <div 
      className="h-screen flex flex-col relative overflow-hidden" 
      style={{ backgroundColor: "#fffaf6" }}
    >
      
      <div className="h-20 flex justify-between items-center  bg-[#fffaf6] px-6 z-10">
        <Logo></Logo>
        
        <div className="flex gap-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor: pointer" 
            onClick={() => router.push('/premium')}
          >
            Premium
          </Button>
          
        </div>
      </div>

      
      <div className="flex-grow flex flex-row justify-between items-center px-6">
        <div className="text-left w-1/2">
          <div className="text-6xl font-extrabold text-black drop-shadow-lg">
          Welcome to 
          <div className="text-6xl font-extrabold text-purple-600 drop-shadow-lg">
            AI Mock Interview
            </div>
          </div>
          
          <p className="text-lg text-black mt-6 text-left max-w-2xl">
            Our AI-powered interview preparation platform empowers you to ace your job interviews. 
            Practice with realistic questions tailored to specific roles and receive instant, 
            insightful feedback on your responses. Build confidence, refine your communication skills, 
            and increase your chances of landing your dream job. Get ready to impress and stand out from the competition.
          </p>

          <Button
            onClick={handleGoogleSignIn}
            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg rounded-lg shadow-lg self-start"
          >
            Get Started
          </Button>

          <p className="text-lg text-black mt-12 font-semibold text-left">
            Interview patterns also available for MAANG companies
          </p>

          <div className="flex gap-6 mt-4">
            <Image src="/meta-icon-new-facebook-2021-logo-png_seeklogo-424014.png" alt="Meta" width={50} height={50} />
            <Image src="/432495.webp" alt="Apple" width={50} height={50} />
            <Image src="/Amazon-Logo-Transparent-PNG.png" alt="Amazon" width={50} height={50} />
            <Image src="/netflix_PNG22.png" alt="Netflix" width={50} height={50} />
            <Image src="/google-logo-on-transparent-white-background-free-vector-removebg-preview.png" alt="Google" width={50} height={50} />
          </div>
        </div>

        <div className="w-1/2 flex justify-center">
          <Image src="/9652801_4218935.jpg" alt="Illustration" width={740} height={360} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}