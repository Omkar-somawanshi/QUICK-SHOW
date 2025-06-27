import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { ArrowRight, ClockIcon } from 'lucide-react';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import isoTimeFormat from '../lib/IsoTimeFormat';
import BlurCircle from '../components/BlurCircle';
import screenImage from '../assets/screenImage.svg';
import toast from 'react-hot-toast';

const Seatlayout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState(null);

  useEffect(() => {
    const foundShow = dummyShowsData.find((item) => item.id.toString() === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  if (!show) return <Loading />;

  const availableTimes = show.dateTime[date];

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      toast.error('Please select a time first.');
      return;
    }

    const isSelected = selectedSeats.includes(seatId);

    if (!isSelected && selectedSeats.length >= 5) {
      toast.error('You can only select up to 5 seats.');
      return;
    }

    setSelectedSeats((prev) =>
      isSelected ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const rowConfig = {
    A: 9,
    B: 7,
    C: 9,
    D: 9,
    E: 9,
    F: 6,
    G: 9,
    H: 9,
    I: 6,
    J: 5,
  };

  const renderSeats = (row, count) => (
    <div key={row} className="flex gap-2 justify-center mt-2">
      {Array.from({ length: count }, (_, index) => {
        const seatId = `${row}${index + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`w-8 h-8 rounded border border-primary/60 text-xs font-medium cursor-pointer
              ${isSelected ? 'bg-primary text-white' : 'bg-white/10 hover:bg-white/20'}`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 pt-40 text-white">
      {/* Time Selector */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-6 h-max md:sticky md:top-32">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {availableTimes && availableTimes.length > 0 ? (
            availableTimes.map((timeItem) => (
              <div
                key={timeItem.time}
                onClick={() => {
                  setSelectedTime(timeItem);
                  setSelectedSeats([]);
                }}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                  selectedTime?.time === timeItem.time
                    ? 'bg-primary text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm">{isoTimeFormat(timeItem.time)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 px-6">No timings available for this date.</p>
          )}
        </div>
      </div>

      {/* Seat Grid */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0px" />
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
        <img src={screenImage} alt="screen" className="w-full max-w-md" />
        <p className="text-gray-400 text-sm mt-2 mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center">
          {Object.entries(rowConfig).map(([row, count]) => renderSeats(row, count))}
        </div>
         <button
        onClick={() => navigate('/my-bookings')}
        className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
      >
        Proceed to payment
        <ArrowRight strokeWidth={3} className="w-4 h-4" />
      </button>
    </div>
      </div>

    
     
  );
};

export default Seatlayout;
