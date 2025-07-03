import React from 'react';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Background Hero Section */}
      <div className='relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
        {/* Optional dark gradient overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" 
        />
        
        {/* Foreground Content */}
        <motion.div 
          className="relative z-10 mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <img 
              src={assets.marvelLogo} 
              alt="Marvel Logo" 
              className='max-h-11 lg:h-11 mb-4' 
            />
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className='text-5xl md:text-[70px] md:leading-[80px] font-semibold max-w-4xl text-white'
          >
            Guardians <br /> of the Galaxy
          </motion.h1>

          {/* Tags and Info */}
          <motion.div 
            variants={itemVariants}
            className='flex flex-wrap items-center gap-6 text-gray-300 mt-6'
          >
            <span>Action | Adventure | Sci-Fi</span>

            <div className='flex items-center gap-2'>
              <CalendarIcon className='w-4 h-4' />
              <span>2018</span>
            </div>

            <div className='flex items-center gap-2'>
              <CalendarIcon className='w-4 h-4' />
              <span>2h 8m</span>
            </div>
          </motion.div>

          {/* Description & CTA */}
          <motion.p 
            variants={itemVariants}
            className='max-w-md text-gray-300 mt-4'
          >
            In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
          </motion.p>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/movies")}
            className='mt-6 flex items-center gap-2 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium text-white'
          >
            Explore Movies
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;