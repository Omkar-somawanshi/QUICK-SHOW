import React from 'react';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';
import { useAppContext } from '../context/AppContext';

const Favorite = () => {
  const { FavoriteMovies = [] } = useAppContext(); // fallback to empty array

  return (
    <div className='relative my-20 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top="150px" left="0px"/>
      <BlurCircle bottom="50px" right="50px"/>

      <h1 className='text-lg font-medium my-4 text-white'>Your Favorite Movies</h1>

      {FavoriteMovies.length > 0 ? (
        <div className='flex flex-wrap gap-8 justify-center'>
          {FavoriteMovies.map((movie) => (
            <MovieCard key={movie.id || movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className='text-gray-400'>No movies available.</p>
      )}
    </div>
  );
};

export default Favorite;
