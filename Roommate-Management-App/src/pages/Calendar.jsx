import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Calendar</h2>

      {/* Render events */}
      {events.map((event) => (
        <Card key={event.id} title={event.title}>
          <p>Date: {event.date}</p>
          <p>Participants: {event.participants.join(", ")}</p>
        </Card>
      ))}
    </div>
  );
};

export default Calendar;
