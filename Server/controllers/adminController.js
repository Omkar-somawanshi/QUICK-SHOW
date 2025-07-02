import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

// API to check if user is admin
export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};

// API to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    // Total Bookings and Revenue
    const bookings = await Booking.find({ isPaid: true });
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((total, booking) => total + booking.amount, 0);

    // Active Shows (future shows) with populated movie info
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");

    // Total Users
    const totalUsers = await User.countDocuments();

    const dashboardData = {
      totalBookings,
      totalRevenue,
      activeShows,
      totalUsers,   // ✅ Corrected from totalUser to totalUsers
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all active shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true })
      .populate("user")
      .populate({
        path: "show",
        populate: "movie",
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
