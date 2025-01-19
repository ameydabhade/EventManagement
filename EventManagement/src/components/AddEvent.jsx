import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !date || !location || !image) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5800/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, date, location, image }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/explore"); // Redirect to Explore page after successful event creation
      } else {
        setError(result.message || "An error occurred while creating the event");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <div className="bg-[#1a1a1a] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Add New Event</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg">Event Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-2 bg-[#2d2d2d] rounded-md text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-lg">Event Date</label>
            <input
              type="text"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 mt-2 bg-[#2d2d2d] rounded-md text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-lg">Event Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 mt-2 bg-[#2d2d2d] rounded-md text-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-lg">Event Image URL</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 mt-2 bg-[#2d2d2d] rounded-md text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#7a56d6] rounded-lg text-white text-xl hover:scale-105 transition"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}
