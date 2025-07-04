import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast'; // ✅ Add toast

const timeFormat = (dateTimeObj) => {
  const dates = Object.keys(dateTimeObj);
  return dates.length ? new Date(dates[0]).toDateString() : 'No Date';
};

const Moviedetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const { shows, axios, getToken, user, fetchFavoriteMovie, image_base_url, favoriteMovies } = useAppContext();

  // ✅ Fix: Call API to fetch show details
  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setShow(data.show);
        console.log(data.show);
        
      }
    } catch (error) {
      console.error("Failed to fetch show:", error);
    }
  };

  // ✅ Fix: Correct Axios syntax for favorite
  const handleFavorite = async () => {
    try {
      if (!user) return toast.error("Please login to proceed.");
      const { data } = await axios.post(
        '/api/user/update-favorite',
        { movieId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchFavoriteMovie();
      }
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  useEffect(() => {
    if (id) getShow();
  }, [id]);

  if (!show) return <Loading />;

  const isFavorite = favoriteMovies.some((movie) => movie._id === show.movie._id);

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-20 md:pt-24 text-white scroll-smooth">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={image_base_url + show.movie.poster_path}
          alt={show.movie.title}
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary uppercase tracking-wide">English</p>
          <h1 className="text-4xl font-semibold max-w-96">{show.movie.title}</h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average?.toFixed(1)} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            {timeFormat(show.dateTime)} ·{" "}
            {Array.isArray(show.movie.genres)
              ? show.movie.genres.map((genre) => genre.name).join(", ")
              : "Genre N/A"}{" "}
            · {show.movie.release_date?.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>

            <button
              onClick={handleFavorite}
              className={`bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95 ${
                isFavorite ? 'text-primary fill-primary' : ''
              }`}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Favorite Cast Section */}
      <p className="text-lg font-medium mt-20">Your Favorite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts?.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center min-w-[80px]">
              <img
                src={image_base_url + cast.profile_path}
                alt={cast.name}
                className="rounded-full h-20 w-20 object-cover"
              />
              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Date Selector */}
<DateSelect
  dateTime={Object.fromEntries(
    Object.entries(show.dateTime).map(([date, slots]) => [
      date,
      slots.map((slot) => slot.time),
    ])
  )}
  id={id}
/>


      {/* You May Also Like Section */}
      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {shows
          .filter((movie) => movie.movie._id.toString() !== id)
          .slice(0, 4)
          .map((movie, index) => (
            <MovieCard key={movie._id || index} movie={movie.movie} />
          ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Moviedetails;
