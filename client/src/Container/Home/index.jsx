import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import HeroImage from "../../Assets/Images/hero.jpg";
import { Spinner } from "../../Components/Spinner";

export default function HomePage() {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState("");
  const [trainLocation, setTrainLocation] = useState();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getTrains();
  }, []);

  useEffect(() => {
    const getTrainLocation = async () => {
      setLoading(true);
      if (!token) {
        setLoading(false);
        alert("Please sign in to view train location");
        window.location.href = "/login";
        return;
      }
      await axios
        .get(`${process.env.REACT_APP_API_URL}train`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { trainId: selectedTrain },
        })
        .then((res) => {
          setTrainLocation(res.data.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    if (selectedTrain) {
      getTrainLocation();
    }
  }, [selectedTrain]);

  const getTrains = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}train/trainList`)
      .then((res) => {
        setTrains(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="relative">
      <img
        className="object-cover w-full max-w-full h-screen object-center opacity-80"
        src={HeroImage}
        alt="hero-img"
      />
      <div className="!absolute inset-0 flex flex-col justify-center items-center gap-10 md:px-20">
        <div className="grid lg:grid-cols-2 sm:grid-rows-1">
          <div className="bg-blue-400 p-8">
            <p className="text-xl text-white mb-2">Welcome to TRTL</p>
            <p className="text-sm text-white">
              You can search real time train location here
            </p>
          </div>
          <div className="bg-white p-4 flex flex-col gap-5">
            <p className="text-sm text-gray-500">
              Sri Lanka Railway Real-Time Train Tracking
            </p>
            <select
              value={selectedTrain}
              onChange={(e) => setSelectedTrain(e.target.value)}
              className="focus:outline-none ring-1 ring-gray-500 text-gray-500 py-2"
            >
              <option value="1" disabled selected>
                Select Train
              </option>
              {trains.map((train, idx) => (
                <option key={idx} value={train.trainId}>
                  {train.trainId}
                </option>
              ))}
            </select>

            {!loading ? (
              <table className="text-sm w-full min-w-max table-auto text-left ring-1 ring-gray-500">
                <thead>
                  <tr className="bg-gray-400 text-white">
                    <th className="font-normal px-2">Location</th>
                    <th className="font-normal ">Latitude</th>
                    <th className="font-normal ">Longitude</th>
                    <th className="font-normal">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {trainLocation && (
                    <tr className="border-b text-red-500">
                      <td className="px-2">{trainLocation?.locationName}</td>
                      <td className="px-2">
                        {Number(trainLocation?.latitude).toFixed(4)}
                      </td>
                      <td className="px-2">
                        {Number(trainLocation?.longitude).toFixed(4)}
                      </td>
                      <td className="px-2">
                        {moment(trainLocation?.timestamp).format("hh:mm A")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div>
                <Spinner loading={loading} />
              </div>
            )}

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  setSelectedTrain("");
                  setTrainLocation(null);
                }}
                className="ring-1 ring-gray-500 text-gray-500 p-2 hover:ring-0 hover:bg-red-500 hover:text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center absolute top-[770px] left-0 right-0"></div>
    </div>
  );
}
