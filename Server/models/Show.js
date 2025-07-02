import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: String,
      ref: "Movie",            // ✅ THIS IS MISSING IN YOUR CURRENT CODE
      required: true,
    },
    showDateTime: { type: Date, required: true },
    showPrice: { type: Number, required: true },
    occupiedSeats: { type: Object, default: {} },
  },
  { minimize: false }
);

const Show = mongoose.model("Show", showSchema);

export default Show;
