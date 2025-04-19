import React from 'react';
import { Music } from 'lucide-react';

const TikTokLogo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center">
        <div className="bg-[#25F4EE] w-6 h-9 absolute left-1 top-0 z-10 animate-pulse"></div>
        <div className="bg-[#FE2C55] w-6 h-9 absolute left-0 top-0 mix-blend-multiply"></div>
        <Music className="text-black w-5 h-5 ml-8" />
        <span className="text-2xl font-bold tracking-tight ml-1">TikTok</span>
      </div>
    </div>
  );
};

export default TikTokLogo;