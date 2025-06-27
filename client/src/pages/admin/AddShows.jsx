import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { CheckIcon, StarIcon, XIcon } from "lucide-react";
import { kConverter } from "../../lib/KConverter";

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const handleAddDateTime = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });

    setDateTimeInput("");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };

  if (nowPlayingMovies.length === 0) return <Loading />;

  return (
    <div className="px-6 md:px-10 lg:px-16 pt-20 text-white">
      {/* Title */}
      <Title text1="Add" text2="Shows" />

      {/* Now Playing Movies */}
      <p className="mt-10 text-base font-semibold">Now Playing Movies</p>
      <div className="overflow-x-auto pb-6">
        <div className="flex flex-wrap gap-4 mt-4">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-40 cursor-pointer group hover:-translate-y-1 transition duration-300 ${
                selectedMovie === movie.id ? "border-2 border-primary" : ""
              } rounded-md`}
              onClick={() => setSelectedMovie(movie.id)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-60 object-cover brightness-90"
                />
                <div className="text-xs flex items-center justify-between p-1 bg-black/70 absolute bottom-0 w-full left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-3 h-3 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">{kConverter(movie.vote_count)} Votes</p>
                </div>
                {selectedMovie === movie.id && (
                  <div className="absolute top-2 right-2 bg-primary h-5 w-5 flex items-center justify-center rounded">
                    <CheckIcon className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                )}
              </div>
              <p className="font-medium truncate mt-1 text-sm">{movie.title}</p>
              <p className="text-gray-400 text-xs">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Price Input */}
      <div className="mt-6">
        <label className="block text-xs font-medium mb-1">Show Price</label>
        <div className="flex items-center gap-2 border border-gray-600 px-2 py-1 rounded-md w-56">
          <p className="text-gray-400 text-xs">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter Price"
            className="outline-none bg-transparent text-white w-full text-xs"
          />
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="mt-6">
        <label className="block text-xs font-medium mb-1">Select Date and Time</label>
        <div className="flex gap-2 items-center border border-gray-600 px-2 py-1 rounded-md w-80">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md bg-transparent text-white px-2 py-1 w-full text-xs"
          />
          <button
            onClick={handleAddDateTime}
            className="bg-primary text-white text-xs px-3 py-1 rounded hover:bg-primary/80 transition"
          >
            Add
          </button>
        </div>

        {/* Selected Dates and Times */}
        {Object.keys(dateTimeSelection).length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium mb-1">Selected Dates and Times:</p>
            {Object.keys(dateTimeSelection).map((date) => (
              <div key={date} className="mb-2">
                <p className="text-gray-300 text-xs font-medium">{date}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dateTimeSelection[date].map((time) => (
                    <div
                      key={time}
                      className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded text-xs"
                    >
                      {time}
                      <XIcon
                        onClick={() => handleRemoveTime(date, time)}
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer">
Add Show
        </button>
      </div>
    </div>
  );
};

export default AddShows;
