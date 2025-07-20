import React from 'react';
import EventCard from './EventCard';

const TopEvents = () => {
  const eventDatacards = [
    {
      id: 1,
      title: "Tech Hackathon",
      venue: "Auditorium A",
      date: "April 25, 2025",
      category: "AI/ML",
      img: "/event1.jpg",
    },
    {
      id: 2,
      title: "Cloud Bootcamp",
      venue: "Hall B",
      date: "May 10, 2025",
      category: "Cloud Computing",
      img: "/event2.jpg",
    },
    {
      id: 3,
      title: "Tech Hackathon",
      venue: "Auditorium A",
      date: "April 25, 2025",
      category: "AI/ML",
      img: "/event1.jpg",
    },
  ];

  return (
    <div>
   <div>
      {/* Top Events */}
      <h2 className="text-center text-white text-3xl font-bold  mb-8">Top Events</h2>
      <div className="grid grid-cols-1  mb-40 md:grid-cols-3 gap-6 px-4">
        {eventDatacards.map((event) => (
          <div
            key={event.id}
            className="relative flex rounded-lg overflow-hidden h-56 bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${event.img})` }}
          >
            <div className="absolute inset-0 bg-black/50 z-0" />
            <div className="relative z-10 flex w-full">
              <div className="w-1/2"></div>
              <div className="p-4 flex flex-col items-center justify-between w-1/3 ">
                <div>
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-300">{event.category}</p>
                </div>
                <a
                  href="./eventdetails"
                  className="border border-primary text-primary px-3 py-1 rounded-md"
                >
                  View More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
  );
};

export default TopEvents;