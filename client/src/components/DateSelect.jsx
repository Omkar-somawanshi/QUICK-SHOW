import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import BlurCircle from "./BlurCircle";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const onBookHandler = () => {
    if (!selectedDate || !selectedTime) {
      toast("Please select both date and time");
      return;
    }

    navigate(`/movies/${id}/${selectedDate}/${selectedTime}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const timesForDate = selectedDate ? dateTime[selectedDate] : [];

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="-100px" right="0px" />

        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime || {}).map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null); // reset time when changing date
                  }}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer transition ${
                    selectedDate === date
                      ? "bg-primary text-white"
                      : "bg-white/10 hover:bg-white/20 border border-primary/70"
                  }`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleString("en-US", { month: "short" })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} />
          </div>
        </div>

        {/* Time selection */}
        {selectedDate && (
          <div>
            <p className="text-lg font-semibold">Choose Time</p>
            {timesForDate.length === 0 ? (
              <p className="text-gray-400 mt-2">No timings available</p>
            ) : (
              <div className="flex flex-wrap gap-4 mt-4">
                {timesForDate.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded text-sm ${
                      selectedTime === time
                        ? "bg-primary text-white"
                        : "bg-white/10 text-white border border-primary/70 hover:bg-white/20"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={onBookHandler}
          className="bg-primary text-white py-2 px-8 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer self-start"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
