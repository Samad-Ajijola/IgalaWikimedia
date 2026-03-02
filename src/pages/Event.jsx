import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import { useApp } from "../context/AppContext";

const Event = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const { BASE_URL } = useApp();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/event?length=6`);
        setEvents(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Events and Activities
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Discover the vibrant activities and events happening in the Igala
            Wikimedia Community. Join us in celebrating and preserving our rich
            cultural heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            return (
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden"
                key={event.id}
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 h-60">
                  <img
                    src={event.imageSrc}
                    alt={event.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    //   loading="lazy"
                  />
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-extrabold tracking-tight text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                    {event.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {event.description ||
                      "Community event showcasing Igala culture and Wikimedia contributions."}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={event.id ? `/events/${event.id}` : "/events"}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Event;
