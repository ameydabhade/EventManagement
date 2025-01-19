import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventPage() {
  const [event, setEvent] = useState(null);
  const [userRole, setUserRole] = useState(""); // State to store user role
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate(); // For navigation after delete

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
    
    // Check if user is admin and set role from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role); // Set the user's role
    }
  }, [id]);

  // Function to handle event deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5800/events/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Redirect to the event listing or explore page after successful deletion
          navigate("/explore");
        } else {
          console.error("Error deleting event:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

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
        <p className="text-lg">{event.description || "No description available"}</p>

        {/* Show Delete button if the user is an admin */}
        {userRole === "admin" && (
          <button
            onClick={handleDelete}
            className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#fa4d56] focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
}

export default EventPage;
