import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Explore() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateRange = () => {
      if (!startDate && !endDate) return true;

      const eventDate = new Date(event.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) return eventDate >= start && eventDate <= end;
      if (start) return eventDate >= start;
      if (end) return eventDate <= end;

      return true;
    };

    return matchesSearchTerm && matchesDateRange();
  });

  if (loading) {
    return <div className="text-center text-white">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-white">Error fetching events: {error}</div>;
  }

  if (events.length === 0) {
    return <div className="text-center text-white">No events available.</div>;
  }

  return (
    <div className="m-6">
      {/* Filters */}
      <div className="mb-6">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-black text-white mb-4"
        />

        {/* Date filters */}
        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-black text-white"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-black text-white"
          />
        </div>
      </div>

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="text-white py-2 px-6 rounded-lg border-2 hover:scale-105 transition border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] duration-300"
          >
            <Link to={`/events/${event._id}`}>
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
