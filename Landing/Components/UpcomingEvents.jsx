import React, { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpcomingEvents = () => {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const eventDatacards = [
    {
      id: 1,
      title: 'Tech Hackathon',
      venue: 'Auditorium A',
      date: 'April 25, 2025',
      category: 'AI/ML',
      img: '/event1.jpg',
    },
    {
      id: 2,
      title: 'Startup Expo',
      venue: 'Hall B',
      date: 'May 5, 2025',
      category: 'Blockchain',
      img: '/event2.jpg',
    },
    {
      id: 3,
      title: 'DevFest',
      venue: 'Auditorium C',
      date: 'June 10, 2025',
      category: 'DevOps',
      img: '/event1.jpg',
    },
    {
      id: 4,
      title: 'AI Workshop',
      venue: 'Lab D',
      date: 'July 15, 2025',
      category: 'AI/ML',
      img: '/event2.jpg',
    },
    {
      id: 5,
      title: 'Startup Expo',
      venue: 'Hall B',
      date: 'May 5, 2025',
      category: 'Blockchain',
      img: '/event2.jpg',
    },
    {
      id: 6,
      title: 'DevFest',
      venue: 'Auditorium C',
      date: 'June 10, 2025',
      category: 'DevOps',
      img: '/event1.jpg',
    },
    {
      id: 7,
      title: 'AI Workshop',
      venue: 'Lab D',
      date: 'July 15, 2025',
      category: 'AI/ML',
      img: '/event2.jpg',
    },
  ];

  const scrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = 300 * 2 + 16 * 2;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      toast.info('Scrolled right', { theme: 'dark' });
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      const scrollAmount = 300 * 2 + 16 * 2;
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
      toast.info('Scrolled left', { theme: 'dark' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const maxScrollLeft =
          containerRef.current.scrollWidth - containerRef.current.clientWidth;
        const currentScrollLeft = containerRef.current.scrollLeft;

        setShowLeft(currentScrollLeft > 1); // Small buffer
        setShowRight(currentScrollLeft < maxScrollLeft - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      className="px-6 p-10"
      role="region"
      aria-label="Upcoming Events"
    >
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      <h2 className="text-3xl font-semibold text-gray-100 tracking-tight mb-6">
        Upcoming Events
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth gap-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {eventDatacards.map((event) => (
            <div
              key={event.id}
              className="min-w-[300px] h-[400px] bg-gradient-to-br from-gray-800 via-gray-900 to-gray-850 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] border border-gray-700/20 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex-shrink-0 flex flex-col text-gray-100 relative overflow-hidden animate-fadeIn"
            >
              {/* Image Section (Top 50%) */}
              <div className="relative h-[60%] w-full">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${event.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                {/* Gradient Fade to Text Section */}
                <div className="absolute bottom-0 left-0 w-full h-42 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-transparent" />
                <span className="absolute bottom-2 left-2 inline-block text-xs font-semibold px-3 py-1 rounded-xl bg-gradient-to-r from-purple-700 to-purple-900 text-gray-100 shadow-md">
                  {event.category}
                </span>
              </div>

              {/* Content Section (Bottom 50%) */}
              <div className="h-[40%] p-4 flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-100">{event.title}</h3>
                  <p className="text-sm text-gray-300">📍 {event.venue}</p>
                  <p className="text-sm text-gray-300">🗓️ {event.date}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <a
                    href="./register-event"
                    className="flex-1 text-center px-3 py-2 text-sm rounded-xl font-semibold bg-gradient-to-r from-purple-700 to-purple-900 text-gray-100 shadow-md hover:from-purple-600 hover:to-purple-800 hover:scale-105 transition-all duration-200"
                    aria-label={`Apply for ${event.title}`}
                    onClick={() => toast.success(`Applying for ${event.title}`, { theme: 'dark' })}
                  >
                    Apply Now
                  </a>
                  <a
                    href="./eventdetails"
                    className="flex-1 text-center px-3 py-2 text-sm rounded-xl font-semibold border border-gray-500 text-gray-100 hover:bg-gray-800 hover:scale-105 transition-all duration-200"
                    aria-label={`View details for ${event.title}`}
                    onClick={() => toast.info(`Viewing ${event.title} details`, { theme: 'dark' })}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        {showLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-700 to-purple-900 text-gray-100 p-2 rounded-full hover:from-purple-600 hover:to-purple-800 transition-all duration-200 shadow-md focus:ring-2 focus:ring-purple-500"
            aria-label="Scroll left"
          >
            <FaArrowLeft />
          </button>
        )}
        {showRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-700 to-purple-900 text-gray-100 p-2 rounded-full hover:from-purple-600 hover:to-purple-800 transition-all duration-200 shadow-md focus:ring-2 focus:ring-purple-500"
            aria-label="Scroll right"
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;

<style>
{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
`}
</style>