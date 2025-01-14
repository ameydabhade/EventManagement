import React from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const featuredEvents = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "Aug 15-17, 2025",
    location: "San Francisco",
    image: "/SanFrancisco.png",
  },
  {
    id: 2,
    title: "Music Festival",
    date: "Sep 22-24, 2025",
    location: "Austin",
    image: "/Austin.png",
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "Oct 5-7, 2025",
    location: "New York",
    image: "/NewYork.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-2">
          <h2 className="text-5xl font-bold mb-4">Discover Amazing Events</h2>
          <p className="text-xl mb-2">
            Find and attend events that match your passions
          </p>
        </section>
        <div className="justify-center flex">
            <Link to="explore" className="text-white font-2xl p-4 bg-[#7a56d6] m-8 hover:scale-105 transition rounded-lg">
                Explore Now!!
            </Link>
        </div>

        <section>
          <h3 className="text-3xl font-semibold mb-6 text-center">
            Featured Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                  className="text-white py-2 px-6 rounded-lg border-2 hover:scale-105 transition border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6]  duration-300"
              >
                <img
                  src={event.image || "/placeholder.png"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                <p className="flex items-center mb-2">
                  <CalendarDays className="mr-2 h-4 w-4" /> {event.date}
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" /> {event.location}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
