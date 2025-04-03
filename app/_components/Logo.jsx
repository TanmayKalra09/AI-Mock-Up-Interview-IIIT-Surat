import React from 'react';
import Image from 'next/image';

function Logo() {
  return (
    <div className="flex items-center gap-4 ml-8">
      <Image 
        src="/2944658_28388-removebg-preview.png"  
        alt="AI Mock Interview Logo" 
        width={80} 
        height={80} 
      />
      <h1 className="text-xl font-semibold text-gray-800">
        AI Mock Interview
      </h1>
    </div>
  );
}

export default Logo;