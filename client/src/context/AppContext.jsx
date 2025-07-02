import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ✅ Set Axios base URL globally
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Fetch Admin Status
  // ✅ Fetch Admin Status
const fetchIsAdmin = async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get("/api/admin/is-admin", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setIsAdmin(data.isAdmin);

    if (!data.isAdmin && location.pathname.startsWith("/admin")) {
      navigate("/");
      toast.error("You are not authorized to access the admin dashboard.");
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
  }
};

// ✅ Fetch All Shows (updated with token ✅)
const fetchShows = async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get("/api/admin/all-shows", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setShows(data.shows);
    } else {
      toast.error(data.message || "Failed to fetch shows.");
    }
  } catch (error) {
    console.error("Error fetching shows:", error);
    toast.error("Failed to fetch shows.");
  }
};

// ✅ Fetch Favorite Movies
const fetchFavoriteMovie = async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get("/api/user/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setFavoriteMovies(data.movies);
    } else {
      toast.error(data.message || "Failed to fetch favorites.");
    }
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
  }
};


  // ✅ Fetch All Shows
 

  // ✅ Fetch Favorite Movies


  // ✅ Initial Fetches
  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const value = {
    axios,
    isAdmin,
    user,
    getToken,
    navigate,
    shows,
    setShows,
    favoriteMovies,
    setFavoriteMovies,
    fetchIsAdmin,
    fetchShows,
    fetchFavoriteMovie,
    image_base_url
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
