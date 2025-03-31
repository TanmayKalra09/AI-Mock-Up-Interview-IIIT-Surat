"use client"
import { Button } from '@/components/ui/button';
import React from 'react';
import Logo from '../_components/Logo';
import { useRouter } from "next/navigation";

function Premium() {
    const router = useRouter();
  return (
    <div>

      <div className="h-20 flex justify-between items-center shadow-md bg-white px-6 z-10">
        <Logo />
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg" onClick={() => router.push('/')}>Back to Home</Button>
      </div>
    
      <div className=' bg-gray-100 p-5'>
        <div className="text-center text-3xl font-bold text-purple-700 my-2">Our Plans</div>
      </div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        
          <div className="p-12 bg-white shadow-xl rounded-3xl border border-gray-300 text-center w-full">
            <div className="text-2xl font-semibold text-gray-700 mb-2">₹0 / month</div>
            <h2 className="text-4xl font-bold text-purple-700 mb-6">Free Plan</h2>
            <ul className="text-lg text-gray-700 space-y-4 mb-8">
              <li>✔ Basic Interview Preparation</li>
              <li>✔ Limited AI Feedback</li>
              <li>✔ Access to General Questions</li>
              <li>✔ Standard Video Quality</li>
            </ul>
            <Button className="bg-gray-400 text-white px-8 py-4 rounded-lg cursor-not-allowed" disabled>
              Current Plan
            </Button>
          </div>
          
          <div className="p-12 bg-purple-600 text-white shadow-xl rounded-3xl border border-purple-700 text-center w-full">
            <div className="text-2xl font-semibold text-white mb-2">₹499 / month</div>
            <h2 className="text-4xl font-bold mb-6">Premium Plan</h2>
            <ul className="text-lg space-y-4 mb-8">
              <li>⭐ Advanced AI Feedback</li>
              <li>⭐ Personalized Interview Questions</li>
              <li>⭐ High-Quality Video Recording</li>
              <li>⭐ Priority Customer Support</li>
            </ul>
            <Button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-200">
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
