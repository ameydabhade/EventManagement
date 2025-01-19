import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]); // State for events
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State to store error message

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("user"); // Assuming token is stored in localStorage
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch events from the backend API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("https://eventmanagement-5c1x.onrender.com/events"); // Adjust to your backend API URL
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEvents(data); // Set events from the API response
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message); // Set error message in state
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    }

    fetchEvents();
  }, []);

  // Redirect to the appropriate page based on login status
  const handleExploreClick = () => {
    if (isLoggedIn) {
      navigate("/explore");
    } else {
      navigate("/login");
    }
  };

  // Handle event click to navigate to event details page
  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`); // Navigate to event details page
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>; // Show loading state while fetching data
  }

  if (error) {
    return <div className="text-center text-white">Error fetching events: {error}</div>; // Show error message if an error occurred
  }

  // Only show the first 4 events
  const displayedEvents = events.slice(0, 4);

  return (
    <div className="bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-2">
          <h2 className="text-5xl font-bold mb-4">Discover Amazing Events</h2>
          <p className="text-xl mb-2">Find and attend events that match your passions</p>
        </section>
        <div className="justify-center flex">
          {/* Explore Now button, conditional redirect */}
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
                key={event._id} // Assuming _id is the unique identifier from the backend
                className="text-white py-2 px-6 rounded-lg border-2 hover:scale-105 transition border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] duration-300 cursor-pointer"
                onClick={() => handleEventClick(event._id)} // Add onClick event to navigate to event details
              >
                <img
                  src={event.image || "/placeholder.png"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                <p className="mb-2">📅 {event.date}</p>
                <p>📍 {event.location}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
