import React from "react";
import { CalendarDays, MapPin } from "lucide-react";

function Explore() {
    const Events = [
        {
          id: 1,
          title: "Tech Conference 2025",
          date: "Aug 15-17, 2025",
          location: "San Francisco",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882906/Cities/SanFrancisco.webp",
        },
        {
          id: 2,
          title: "Music Festival",
          date: "Sep 22-24, 2025",
          location: "Austin",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882991/Cities/Austin.jpg",
        },
        {
          id: 3,
          title: "Food & Wine Expo",
          date: "Oct 5-7, 2025",
          location: "New York",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882906/Cities/NewYork.webp",
        },
        {
          id: 4,
          title: "Vienna Cultural Summit",
          date: "Nov 1-3, 2025",
          location: "Vienna",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882905/Cities/Vienna.webp",
        },
        {
          id: 5,
          title: "Zurich Tech Expo",
          date: "Oct 12-14, 2025",
          location: "Zurich",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882906/Cities/Zurich.webp",
        },
        {
          id: 6,
          title: "Copenhagen Sustainability Conference ",
          date: "Nov 5-7, 2025",
          location: "Copenhagen",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882904/Cities/Copenhagen.webp",
        },
        {
          id: 7,
          title: "Tokyo Innovation Forum ",
          date: "Dec 3-5, 2025",
          location: "Tokyo",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882905/Cities/Tokyo.webp",
        },
        {
          id: 8,
          title: "Melbourne Arts Festival ",
          date: "Nov 20-22, 2025",
          location: "Melbourne",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882905/Cities/Melbourne.webp",
        },
        {
          id: 9,
          title: "Barcelona Design Week ",
          date: "Sep 18-20, 2025",
          location: "Barcelona",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882904/Cities/Barcelona.webp",
        },
        {
          id: 10,
          title: "Amsterdam Music & Arts ",
          date: "Aug 22-24, 2025",
          location: "Amsterdam",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882904/Cities/Amsterdam.webp",
        },
        {
          id: 11,
          title: "London Fashion Week ",
          date: "Sep 10-12, 2025",
          location: "London",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882905/Cities/London.webp",
        },
        {
          id: 12,
          title: "Vancouver Winter Sports Expo ",
          date: "Dec 1-3, 2025",
          location: "Vancouver",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882905/Cities/Vancauver.webp",
        },
        {
          id: 13,
          title: "Paris Gourmet Festival ",
          date: "Oct 15-17, 2025",
          location: "Paris",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882905/Cities/Paris.webp",
        },
        {
          id: 14,
          title: "Dubai Tech Expo ",
          date: "Nov 25-27, 2025",
          location: "Dubai",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882904/Cities/Dubai.webp",
        },
        {
          id: 15,
          title: "Seoul Digital Innovation Summit ",
          date: "Oct 20-22, 2025",
          location: "Seoul",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882904/Cities/Seoul.webp",
        },
        {
          id: 16,
          title: "Stockholm Design Conference ",
          date: "Sep 25-27, 2025",
          location: "Stockholm",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882905/Cities/StockHolm.webp",
        },
        {
          id: 17,
          title: "Hong Kong International Film Festival ",
          date: "Aug 10-12, 2025",
          location: "Hong Kong",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882904/Cities/HongKong.webp",
        },
        {
          id: 18,
          title: "Reykjavik Music & Arts Festival ",
          date: "Oct 30-Nov 1, 2025",
          location: "Reykjavik",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882904/Cities/Reykjavik.webp",
        },
        {
          id: 19,
          title: "Lisbon Digital Marketing Summit ",
          date: "Nov 8-10, 2025",
          location: "Lisbon",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882904/Cities/Lisbon.webp",
        },
        {
          id: 20,
          title: "Bangkok Street Food Festival ",
          date: "Sep 12-14, 2025",
          location: "Bangkok",
          image: "https://res.cloudinary.com/dr363meyv/image/upload/v1736882904/Cities/Bangkok.webp",
        },
      ];
      
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-8">
        {Events.map((event) => (
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
    </>
  );
}
export default Explore;
