"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { flightData } from "./data/flightData";

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  price: number;
}

export default function FlightRegistration() {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    setFlights(flightData.flights);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Available Flights</h1>
      <div className="row">
        {flights.map((flight) => (
          <div key={flight.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {flight.from} to {flight.to}
                </h5>
                <p className="card-text">Date: {flight.date}</p>
                <p className="card-text">Price: ${flight.price}</p>
                <Link
                  href={`/seat-registration/${flight.id}`}
                  className="btn btn-primary"
                >
                  Select Seats
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
