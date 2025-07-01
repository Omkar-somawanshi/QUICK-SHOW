import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  show: { type: mongoose.Schema.Types.ObjectId, ref: "Show" },
  amount: Number,
  bookedSeats: [String],
  isPaid: { type: Boolean, default: true },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
