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
    <div className="container mx-auto p-6 bg-black min-h-screen ">
      <div className="max-w-4xl mx-auto bg-black bg-opacity-90 text-white border-[#7a56d6] border-2 p-6 rounded-lg shadow-md">
        <img
          src={event.image || "/placeholder.png"} // Fallback image if none exists
          alt={event.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h2 className="text-3xl font-semibold mb-2 text-white">{event.title}</h2>
        <p className="text-white text-xl mb-4">{formattedDate}</p> {/* Display formatted date */}
        <p className="flex items-center mb-4">
          <i className="fas fa-map-marker-alt mr-2"></i>
          {event.location}
        </p>

        {/* Add description text */}
        <p className="text-white mb-6">
           Desctiption example : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia, dui et lobortis posuere, odio felis viverra ligula, id cursus odio risus eget augue. Nunc facilisis justo sed ipsum porttitor, sit amet feugiat lorem euismod. Integer sed arcu eu ante gravida feugiat. Donec bibendum augue vel erat interdum, vel scelerisque ante blandit. Sed dapibus lorem eget nulla eleifend, non fermentum arcu auctor. Phasellus a libero in nisl fringilla suscipit sed ac libero. Fusce sit amet sapien velit. Suspendisse potenti. Curabitur dictum gravida tincidunt.
        </p>

        {/* Show Delete button if the user is an admin */}
        {userRole === "admin" && (
          <button
            onClick={handleDelete}
            className="mt-6 w-full text-white py-2 px-6 rounded-lg border-2 border-transparent hover:text-[#7a56d6] border-white hover:border-[#7a56d6] transition-colors duration-300">
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
}

export default EventPage;
