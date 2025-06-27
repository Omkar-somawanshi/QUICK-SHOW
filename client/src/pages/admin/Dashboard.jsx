import { useEffect, useState } from "react";
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";

import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import BlurCircle from "../../components/BlurCircle";
import { dummyDashboardData } from "../../assets/assets";
import { dateFormat } from "../../lib/dateFormat";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeShows: [],
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue || 0}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || 0,
      icon: ChartLineIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || 0,
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUsers || 0,
      icon: UserIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setTimeout(() => {
      setDashboardData(dummyDashboardData);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="relative px-6 md:px-10 lg:px-16 pt-12 text-white min-h-[80vh]">
      {/* Background Blur Effects */}
      <BlurCircle top="-100px" left="0px" />
      <BlurCircle bottom="-50px" right="0px" />

      {/* Dashboard Title */}
<div className="pb-10">
       <Title text1="Admin" text2="Dashboard" />
     </div>
      {/* Dashboard Stat Cards */}
      <div className="flex flex-wrap gap-4 mt-6">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md shadow-sm w-56"
            >
              <div>
                <h2 className="text-gray-300 text-xs">{card.title}</h2>
                <p className="text-lg font-bold mt-1">{card.value}</p>
              </div>
              <Icon className="w-6 h-6 text-primary" />
            </div>
          );
        })}
      </div>

      {/* Active Shows List */}
      <p className="mt-10 text-lg font-semibold">Active Shows</p>

      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="100px" left="-10px" />

        {dashboardData.activeShows.map((show) => (
          <div
            key={show.id}
            className="w-56 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300 shadow-sm"
          >
            <img
              src={show.movie.poster_path}
              alt={show.movie.title}
              className="h-60 w-full object-cover"
            />
            <p className="font-medium p-2 truncate">{show.movie.title}</p>

            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency}
                {show.showPrice}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>

            <p className="px-2 pt-2 text-sm text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
