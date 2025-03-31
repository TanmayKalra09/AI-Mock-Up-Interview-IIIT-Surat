"use client";
import {
  GoogleSignInButton,
} from "@/components/ui/authButtons";
import { useSession,signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "./_components/Logo";
import { useRouter } from "next/navigation";
import Footer from "./_components/Footer";

export default function Home() {
  const router = useRouter();

  return (
    <div 
      className="h-screen bg-cover bg-center flex flex-col relative" 
      style={{ backgroundImage: "url('gradient-blur-pink-blue-abstract-background_53876-117324.jpg.avif')" }}
    >
      
      <div className="h-20 flex justify-between items-center shadow-md bg-white/90 px-6 z-10">
   <Logo></Logo>
        
        <div className="flex gap-4">
          {/* <Button 
            className="bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg"
          >
            Sign In
          </Button> */}
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor: pointer" 
          >
            Premium
          </Button>
          <Button 
            className="bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg"
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </Button>
        </div>
      </div>

      
      <div className="flex-grow flex flex-col justify-center items-center px-6 mt-[-100px]">
        <h1 className="text-6xl font-extrabold text-purple-600 drop-shadow-lg">
          Welcome to AI Mock Interview
        </h1>
        
        <p className="text-lg text-black mt-6 text-center max-w-2xl">
          Our AI-powered interview preparation platform empowers you to ace your job interviews. 
          Practice with realistic questions tailored to specific roles and receive instant, 
          insightful feedback on your responses. Build confidence, refine your communication skills, 
          and increase your chances of landing your dream job. Get ready to impress and stand out from the competition.
        </p>

      
        <GoogleSignInButton />
        
        
        <p className="text-lg text-black mt-12 font-semibold">
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
    <Footer/>
      </div>
  );
}