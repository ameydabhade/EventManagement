import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Explore() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show while fetching data
  const [error, setError] = useState(null); // Error state to store error message

  // Fetch events from the API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("https://eventmanagement-5c1x.onrender.com/events");
        
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    }

    fetchEvents();
  }, []);

  // Show loading or error message if needed
  if (loading) {
    return <div className="text-center text-white">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-white">Error fetching events: {error}</div>;
  }

  // If no events are found
  if (events.length === 0) {
    return <div className="text-center text-white">No events available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-6">
      {events.map((event) => (
        <div
          key={event._id} // Use the correct key (MongoDB ID usually)
          className="text-white py-2 px-6 rounded-lg border-2 hover:scale-105 transition border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] duration-300"
        >
          <Link to={`/events/${event._id}`}> {/* Add Link to EventPage */}
            <img
              src={event.image || "/placeholder.png"}
              alt={event.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
            <p className="flex items-center mb-2">
              <i className="fas fa-calendar-day mr-2"></i> {/* Font Awesome Calendar Icon */}
              {event.date} {/* Directly use the date */}
            </p>
            <p className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i> {/* Font Awesome Location Icon */}
              {event.location}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Explore;
