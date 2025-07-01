import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import { Clerk } from "@clerk/clerk-sdk-node";

// Initialize Clerk client
const clerkClient = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// ✅ API: Get all bookings for the logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch user bookings." });
  }
};

// ✅ API: Add or remove favorite movie (toggle) in Clerk metadata
export const updateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);

    // Ensure favorites array exists
    const favorites = user.privateMetadata.favorites || [];

    const isAlreadyFavorite = favorites.includes(movieId);

    const updatedFavorites = isAlreadyFavorite
      ? favorites.filter((id) => id !== movieId) // Remove
      : [...favorites, movieId]; // Add

    // Update user metadata in Clerk
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { favorites: updatedFavorites },
    });

    res.json({
      success: true,
      message: isAlreadyFavorite
        ? "Movie removed from favorites."
        : "Movie added to favorites.",
    });
  } catch (error) {
    console.error("Error updating favorites:", error.message);
    res.status(500).json({ success: false, message: "Failed to update favorites." });
  }
};

// ✅ API: Get user's favorite movies from database
export const getFavorites = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const user = await clerkClient.users.getUser(userId);

    const favorites = user.privateMetadata.favorites || [];

    const movies = await Movie.find({ _id: { $in: favorites } });

    res.json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching favorites:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch favorite movies." });
  }
};
