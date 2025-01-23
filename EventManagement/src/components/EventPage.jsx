import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventPage() {
  const [event, setEvent] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`https://eventmanagement-5c1x.onrender.com/events/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          setError("Failed to load event details.");
        }
      } catch (err) {
        setError("Error fetching event details.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role);
    }
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://eventmanagement-5c1x.onrender.com/events/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: userRole }),
        });

        if (response.ok) {
          navigate("/explore");
        } else {
          setError("Error deleting event.");
        }
      } catch (err) {
        setError("Error deleting event.");
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="container mx-auto p-6 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto bg-black bg-opacity-90 text-white border-[#7a56d6] border-2 p-6 rounded-lg shadow-md">
        <img
          src={event?.image || "/placeholder.png"}
          alt={event?.title || "Event image"}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h2 className="text-3xl font-semibold mb-2 text-white">{event?.title || "Event Title"}</h2>
        <p className="text-white text-xl mb-4">{formattedDate}</p>
        <p className="flex items-center mb-4">
          <i className="fas fa-map-marker-alt mr-2"></i>
          {event?.location || "Location not available"}
        </p>
        {event?.category && (
          <p className="mb-4 text-white">
            <strong>Category:</strong> {event.category}
          </p>
        )}
        <p className="text-white mb-6">
          {event?.description ||
            "No description available for this event. Please check back later for more details."}
        </p>
        {userRole === "admin" && (
          <button
            onClick={handleDelete}
            className="mt-6 w-full text-white py-2 px-6 rounded-lg border-2 border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] transition-colors duration-300"
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
}

export default EventPage;
