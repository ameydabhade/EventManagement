import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventPage() {
  const [event, setEvent] = useState(null);
  const { id } = useParams(); // Get event ID from URL

  // Fetch event data based on ID
  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`http://localhost:5800/events/${id}`); // Corrected backend port
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          console.error("Error fetching event:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    }

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>; // Show loading text while data is being fetched
  }

  // Format date as required (e.g., "Jan 18, 2025")
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <img
          src={event.image || "/placeholder.png"} // Fallback image if none exists
          alt={event.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h2 className="text-3xl font-semibold mb-2">{event.title}</h2>
        <p className="text-gray-500 mb-4">{formattedDate}</p> {/* Display formatted date */}
        <p className="flex items-center mb-4">
          <i className="fas fa-map-marker-alt mr-2"></i>
          {event.location}
        </p>
        {/* Optional description handling */}
        <p className="text-lg">{event.description || "No description available"}</p>
      </div>
    </div>
  );
}

export default EventPage;
