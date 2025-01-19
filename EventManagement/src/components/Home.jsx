import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("https://eventmanagement-5c1x.onrender.com/events");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleExploreClick = () => {
    if (isLoggedIn) {
      navigate("/explore");
    } else {
      navigate("/login");
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-white">Error fetching events: {error}</div>;
  }

  const displayedEvents = events.slice(0, 4);

  return (
    <div className="bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-2">
          <h2 className="text-5xl font-bold mb-4">Discover Amazing Events</h2>
          <p className="text-xl mb-2">Find and attend events that match your passions</p>
        </section>
        <div className="justify-center flex">
          <button
            onClick={handleExploreClick}
            className="text-white text-2xl p-4 bg-[#7a56d6] m-8 hover:scale-105 transition rounded-lg"
          >
            Explore Now!!
          </button>
        </div>

        <section>
          <h3 className="text-3xl font-semibold mb-6 text-center">Featured Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {displayedEvents.map((event) => (
              <div
                key={event._id}
                className="text-white py-2 px-6 rounded-lg border-2 hover:scale-105 transition border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] duration-300 cursor-pointer"
                onClick={() => handleEventClick(event._id)}
              >
                <img
                  src={event.image || "/placeholder.png"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                <p className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
                  {event.date}
                </p>
                <p className="flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  {event.location}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
