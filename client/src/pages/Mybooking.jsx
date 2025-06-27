import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import { dummyBookingData } from "../assets/assets";
import { dateFormat } from "../lib/dateFormat";

const Mybooking = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBooking = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBooking();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] text-white">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />
      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings found.</p>
      ) : (
        bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between bg-white/5 border border-white/10 rounded-lg mt-4 p-4 max-w-3xl"
          >
            {/* Left: Movie Poster & Info */}
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={item?.show?.movie?.poster_path}
                alt={item?.show?.movie?.title || "Movie"}
                className="md:max-w-[180px] aspect-video h-auto object-cover object-bottom rounded"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold">
                    {item?.show?.movie?.title || "Untitled"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {item?.show?.movie?.runtime || "--"} min
                  </p>
                  <p className="text-gray-400 text-sm">
                    {dateFormat(item?.show?.showDateTime)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Amount & Seat Info */}
            <div className="flex flex-col items-end text-right justify-between md:ml-6 mt-4 md:mt-0">
              <div className="flex items-center gap-4 mb-2">
                <p className="text-2xl font-semibold">
                  {currency}
                  {item.amount}
                </p>
                {!item.isPaid && (
                  <button className="bg-primary px-4 py-1.5 text-sm rounded-full font-medium cursor-pointer">
                    Pay Now
                  </button>
                )}
              </div>
              <div className="text-sm">
                <p>
                  <span className="text-gray-400">Total Tickets:</span>{" "}
                  {item.bookedSeats.length}
                </p>
                <p>
                  <span className="text-gray-400">Seat Number:</span>{" "}
                  {item.bookedSeats.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Mybooking;
