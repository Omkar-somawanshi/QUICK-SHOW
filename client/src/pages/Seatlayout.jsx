import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { ArrowRight, ClockIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import screenImage from "../assets/screenImage.svg";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import isoTimeFormat from "../lib/IsoTimeFormat";
import dayjs from "dayjs";

const Seatlayout = () => {
  const { id, date } = useParams(); // Removed "time" param
  const navigate = useNavigate();
  const { axios, getToken, user } = useAppContext();

  const [show, setShow] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const formattedDate = dayjs(date).format("YYYY-MM-DD");

  useEffect(() => {
    const getShow = async () => {
      try {
        const { data } = await axios.get(`/api/show/${id}`, {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });
        if (data.success) setShow(data.show);
        else toast.error(data.message);
      } catch (error) {
        console.error("Failed to fetch show:", error);
        toast.error("Failed to load show data.");
      }
    };

    if (id) getShow();
  }, [id]);

  useEffect(() => {
    const getOccupiedSeats = async () => {
      try {
        const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`);
        if (data.success) {
          setOccupiedSeats(data.occupiedSeats);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch occupied seats:", error);
        toast.error("Error loading occupied seats.");
      }
    };

    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  const bookTickets = async () => {
  try {
    if (!user) return toast.error("Please login to proceed.");
    if (!selectedTime || selectedSeats.length === 0)
      return toast.error("Please select time and seats.");

    console.log("📦 Sending booking payload:", {
      showId: selectedTime.showId,
      selectedSeats,
    });

   const { data } = await axios.post(
  "/api/booking/create",
  { showId: selectedTime.showId, selectedSeats },
  { headers: { Authorization: `Bearer ${await getToken()}` } }
);

console.log("📦 Server response:", data);  // Add this


    console.log("📥 Response from /booking/create:", data);

    if (data.success) {
      toast.success(data.message || "Booking successful!");
      navigate("/mybooking");
    } else {
      toast.error(data.message || "Booking failed.");
    }
  } catch (error) {
    console.error("Booking error:", error.response?.data || error.message);
    toast.error("Something went wrong while booking.");
  }
};


  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast.error("Please select a time first.");
    if (occupiedSeats.includes(seatId)) {
      return toast("Selected seat is already occupied.");
    }
    const isSelected = selectedSeats.includes(seatId);
    if (!isSelected && selectedSeats.length >= 5) {
      return toast.error("You can only select up to 5 seats.");
    }
    setSelectedSeats((prev) =>
      isSelected ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const rowConfig = {
    A: 9, B: 7, C: 9, D: 9, E: 9, F: 6, G: 9, H: 9, I: 6, J: 5,
  };

  const renderSeats = (row, count) => (
    <div key={row} className="flex gap-2 justify-center mt-2">
      {Array.from({ length: count }, (_, index) => {
        const seatId = `${row}${index + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isOccupied = occupiedSeats.includes(seatId);
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            disabled={isOccupied}
            className={`w-8 h-8 rounded border border-primary/60 text-xs font-medium
              ${isSelected ? "bg-primary text-white" : "bg-white/10 hover:bg-white/20"}
              ${isOccupied ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  if (!show) return <Loading />;

  const availableTimes = show?.dateTime?.[formattedDate] || [];

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 pt-40 text-white">
      {/* Time Selector */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-6 h-max md:sticky md:top-32">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {availableTimes.length > 0 ? (
            availableTimes.map((timeItem) => (
              <div
                key={timeItem.time}
                onClick={() => {
                  setSelectedTime(timeItem);
                  setSelectedSeats([]);
                }}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                  selectedTime?.time === timeItem.time
                    ? "bg-primary text-white"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm">{isoTimeFormat(timeItem.time)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-red-400 px-6">
              No timings available for {formattedDate}.
            </p>
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
          {Object.entries(rowConfig).map(([row, count]) =>
            renderSeats(row, count)
          )}
        </div>

        <button
          onClick={bookTickets}
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
