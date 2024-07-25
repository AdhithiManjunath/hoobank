import React from 'react';
import { useNavigate } from 'react-router-dom';
import services from '../assets/services.jpg'; 


const lessons = [
  {
    id: 1,
    title: 'Near Protocol: Arbitrum and L2 Transfer Tools',
    duration: '2 min',
    earnings: '$5GRT',
    route: '/lessons/near-protocol-arbitrum',
    imageUrl: services, 
  },
  {
    id: 2,
    title: 'Near Protocol: Arbitrum and L2 Transfer Tools',
    duration: '4 min',
    earnings: '$1GRT',
    route: '/lessons/near-launches-infrastructure',
    imageUrl: services, 
  },
  {
    id: 3,
    title: 'Boost Indexing Performance with Powered Subgraphs',
    duration: '1 min',
    earnings: '$1GRT',
    route: '/lessons/boost-indexing-performance',
    imageUrl: services, 
  },
  {
    id: 4,
    title: 'Near Protocol Quality of Service Beats Centralized Alternatives',
    duration: '3 min',
    earnings: '$1GRT',
    route: '/lessons/near-protocol-quality',
    imageUrl: services, 
  },
   {
    id: 4,
    title: 'Near Protocol Quality of Service Beats Centralized Alternatives',
    duration: '3 min',
    earnings: '$1GRT',
    route: '/lessons/near-protocol-quality',
    imageUrl: services, 
  },
   {
    id: 4,
    title: 'Near Protocol Quality of Service Beats Centralized Alternatives',
    duration: '3 min',
    earnings: '$1GRT',
    route: '/lessons/near-protocol-quality',
    imageUrl: services, 
  },
  
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-black p-6">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          onClick={() => handleClick(lesson.route)}
          className="flex flex-col justify-between px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 bg-gray-800 cursor-pointer transition-transform hover:scale-105"
        >
          <img src={lesson.imageUrl} alt={lesson.title} className="w-full h-48 rounded-[20px] object-cover" />
          <h2 className="font-poppins font-semibold text-[20px] leading-[32px] text-white mt-4">{lesson.title}</h2>
          <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite mt-2">
            Earn {lesson.earnings} | {lesson.duration}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
