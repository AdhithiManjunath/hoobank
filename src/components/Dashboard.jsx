import React from 'react';
import { useNavigate } from 'react-router-dom';
import services from '../assets/services.jpg';
import {Chart as ChartJS} from "chart.js/auto";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import sourceData from "../data/sourceData.json";
import { close, logo, menu } from "../assets";







const lessons = [
  {
    id: 1,
    title: "Ask for service",

    route: "/ChatSection",
    imageUrl: services,
  },
  {
    id: 2,
    title: "Ask for AI",

    route: "/audioStreamer",
    imageUrl: services,
  },
  {
    id: 1,
    title: "Request service",

    route: "/lessons/request_service",
    imageUrl: services,
  },
  {
    id: 2,
    title: "explore products",

    route: "/lessons/explore_products",
    imageUrl: services,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <>
      <div>
        
      </div>

      <div className="flex-1 px-20 py-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-gray-900 rounded-[20px] cursor-pointer transform transition-transform hover:scale-105">
            <div className="text-lg font-semibold text-white">Total Income</div>
            <div className="text-2xl font-bold text-white">$32,980.45</div>
            <div className="text-green-500 text-base">
              ↑ 12.3% Compared to last month
            </div>
          </div>
          <div className="p-4 bg-gray-900 rounded-[20px] cursor-pointer transform transition-transform hover:scale-105">
            <div className="text-lg font-semibold text-white">Profit</div>
            <div className="text-2xl font-bold text-white">$32,980.45</div>
            <div className="text-green-500 text-base">
              ↑ 12.3% Compared to last month
            </div>
          </div>
          <div className="p-4 bg-gray-900 rounded-[20px] cursor-pointer transform transition-transform hover:scale-105">
            <div className="text-lg font-semibold text-white">Total Views</div>
            <div className="text-2xl font-bold text-white">32,980.45</div>
            <div className="text-red-500 text-base">
              ↓ 12.3% Compared to last month
            </div>
          </div>
          <div className="p-4 bg-gray-900 rounded-[20px] cursor-pointer transform transition-transform hover:scale-105">
            <div className="text-lg font-semibold text-white">
              Conversion Rate
            </div>
            <div className="text-2xl font-bold text-white">4.34%</div>
            <div className="text-red-500 text-base">
              ↓ 12.3% Compared to last month
            </div>
          </div>
        </div>
      </div>

      <div>
        <main className="flex-1 px-20 ">
          <div className="flex flex-wrap justify-center items-center px-3 bg-black ">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => handleClick(lesson.route)}
                className="flex flex-col justify-between px-5 py-5 rounded-[20px] max-w-[340px]  md:mr-10 sm:mr-5 mr-0 my-5 bg-gray-800 cursor-pointer transition-transform hover:scale-105"
              >
                <img
                  src={lesson.imageUrl}
                  alt={lesson.title}
                  className="w-full  rounded-[20px] object-cover"
                />
                <h2 className="font-poppins font-semibold text-[20px] leading-[32px] text-white mt-4">
                  {lesson.title}
                </h2>
              </div>
            ))}
          </div>

          <div className="flex flex-row gap-20 justify-center py-10">
            <div className="p-4 rounded-[20px]  w-[50%] h-[50%] bg-gray-900  transform transition-transform hover:scale-105">
              <h2 className="text-2xl font-bold text-white mb-4 text-center ">
                Revenue over time
              </h2>
              {/* Insert chart or graph here */}
              <Bar
                data={{
                  labels: sourceData.map((data) => data.label),
                  datasets: [
                    {
                      label: "Count",
                      data: sourceData.map((data) => data.value),
                      backgroundColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                      ],
                      borderRadius: 5,
                    },
                  ],
                }}
              />
            </div>

            <div className="p-4  w-50px bg-gray-900  rounded-[20px] transform transition-transform hover:scale-105">
              {/* Insert chart or graph here */}
              <h2 className="text-2xl font-bold text-white mb-4 text-center ">
                Revenue over time
              </h2>
              <Doughnut
                className="pt-5"
                data={{
                  labels: sourceData.map((data) => data.label),
                  datasets: [
                    {
                      label: "Count",
                      data: sourceData.map((data) => data.value),
                      backgroundColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                      ],
                      borderRadius: 5,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
