//function to check availability of seats for a movie
const checkSeatAvailability = async (showId, selelctedSeats) => {
  try {
    await show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;

    const isAnySeats = showdata.some((seat) => occupiedSeats[seat]);
    return (isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]));

    return !isAnySeatTaken;
  } catch (error) {
    console.log(error, message);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selelctedSeats } = req.body;
    const { origin } = req.headers;

    const isSeatAvailable = await checkSeatAvailability(showId, selelctedSeats);
    if (!isSeatAvailable) {
      return res.json({
        success: false,
        message: "Selected Seats are not available",
      });
    }

    //get the show details
    const showData = await Show.findById(showId).populate("movie");

    //create a new booking
    const booking = await Booking.create({
      usser: userId,
      show: showId,
      amount: showData.showPrice * selelctedSeats.length,
      bookedSeats: selelctedSeats,
    });

    selelctedSeats.map((seat) => {
      showData.occupiedSeats[seat] = true;
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    //stripe gateway payment

    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Something went wrong" });
  }
};

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);
    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Something went wrong" });
  }
};
