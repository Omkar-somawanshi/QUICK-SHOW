import React from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react";

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = React.useState(dummyTrailers[0]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px]">Trailers</p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />

        <ReactPlayer
          url={currentTrailer.videoUrl}
          controls
          className="mx-auto max-w-full"
          width="960px"
          height="540px"
        />

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
          {dummyTrailers.map((trailer, index) => (
            <div
              key={index}
              onClick={() => setCurrentTrailer(trailer)}
              className="relative cursor-pointer group hover:-translate-y-1 transition duration-300 max-md:h-60 md:max-h-60"
            >
              <img
                src={trailer.image}
                alt={`Trailer ${index + 1}`}
                className="rounded-lg w-full h-full object-cover brightness-75 group-hover:brightness-100 transition"
              />
              <PlayCircleIcon
                strokeWidth={1.6}
                className="absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailerSection;
