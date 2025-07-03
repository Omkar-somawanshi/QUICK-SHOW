import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
    const { axios, getToken, user,  } = useAppContext();
  

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
     const{data}=await axios.get("/api/admin/all-shows", {
        headers:{Authorization :`Bearer ${await getToken()}`},
     })
     setShows(data.shows)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(user){
      getAllShows();
    }
    getAllShows();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="px-6 md:px-10 lg:px-16 pt-16 text-white">
      {/* Title */}
      <div className="mb-6">
        <Title text1="List" text2="Shows" />
      </div>

      {/* Table */}
      <div className="max-w-4xl overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-3 pl-5 font-medium">Movie Name</th>
              <th className="p-3 font-medium">Show Time</th>
              <th className="p-3 font-medium">Total Bookings</th>
              <th className="p-3 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 hover:bg-white/5 transition"
              >
                <td className="p-3 pl-5">{show.movie.title}</td>
                <td className="p-3">{dateFormat(show.showDateTime)}</td>
                <td className="p-3">
                  {Object.keys(show.occupiedSeats).length}
                </td>
                <td className="p-3">
                  {currency}
                  {Object.keys(show.occupiedSeats).length * show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListShows;
