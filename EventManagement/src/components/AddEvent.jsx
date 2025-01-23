import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(""); // Added category state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !date || !location.trim() || !image.trim() || !category.trim()) {
      setError("All fields are required");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user"));
    const role = userData?.role;

    if (!role) {
      setError("User role is missing");
      return;
    }

    try {
      const response = await fetch("https://eventmanagement-5c1x.onrender.com/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, date, location, image, category, role }), // Added category to request body
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/explore");
      } else {
        setError(result.message || "An error occurred while creating the event");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 space-y-8 rounded-xl shadow-2xl bg-[#1a1a1a]">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Add New Event</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white">Event Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleChange(setTitle)}
                className="w-full px-3 py-2 bg-black opacity-90 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7a56d6] focus:ring-offset-2"
                placeholder="Event Title"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-white">Event Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleChange(setDate)}
                className="w-full px-3 py-2 bg-black opacity-90 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7a56d6] focus:ring-offset-2"
                placeholder="Event Date"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-white">Event Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={handleChange(setLocation)}
                className="w-full px-3 py-2 bg-black opacity-90 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7a56d6] focus:ring-offset-2"
                placeholder="Event Location"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-white">Event Image URL</label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={handleChange(setImage)}
                className="w-full px-3 py-2 bg-black opacity-90 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7a56d6] focus:ring-offset-2"
                placeholder="Event Image URL"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white">Event Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={handleChange(setCategory)} // Handle category change
                className="w-full px-3 py-2 bg-black opacity-90 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7a56d6] focus:ring-offset-2"
                placeholder="Event Category"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 mt-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7a56d6] hover:bg-[#7a56d6] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fa4d56] focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}
