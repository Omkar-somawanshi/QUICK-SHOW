import React from 'react';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Background Hero Section */}
      <div className='relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
        {/* Optional dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />
        
        {/* Foreground Content */}
        <div className="relative z-10 mt-20">
          <img src={assets.marvelLogo} alt="Marvel Logo" className='max-h-11 lg:h-11 mb-4' />

          <h1 className='text-5xl md:text-[70px] md:leading-[80px] font-semibold max-w-4xl text-white'>
            Guardians <br /> of the Galaxy
          </h1>

          {/* Tags and Info */}
          <div className='flex flex-wrap items-center gap-6 text-gray-300 mt-6'>
            <span>Action | Adventure | Sci-Fi</span>

            <div className='flex items-center gap-2'>
              <CalendarIcon className='w-4 h-4' />
              <span>2018</span>
            </div>

            <div className='flex items-center gap-2'>
              <CalendarIcon className='w-4 h-4' />
              <span>2h 8m</span>
            </div>
          </div>

          {/* Description & CTA */}
          <p className='max-w-md text-gray-300 mt-4'>
            In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
          </p>

          <button
            onClick={() => navigate("/movies")}
            className='mt-6 flex items-center gap-2 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium text-white'
          >
            Explore Movies
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
