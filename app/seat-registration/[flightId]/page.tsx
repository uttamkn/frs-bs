"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { flightData } from "../../data/flightData";

interface Seat {
  id: string;
  available: boolean;
}

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  price: number;
  seats: Seat[];
}

export default function SeatRegistration() {
  const unwrappedParams = useParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const selectedFlight = flightData.flights.find(
      (f: Flight) => f.id === unwrappedParams.flightId
    );
    setFlight(selectedFlight || null);
  }, [unwrappedParams.flightId]);

  const handleSeatSelection = (seatId: string) => {
    setSelectedSeat(seatId);
  };

  const handleContinue = () => {
    if (selectedSeat) {
      router.push(`/billing/${unwrappedParams.flightId}/${selectedSeat}`);
    }
  };

  if (!flight) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Select Your Seat</h1>
      <h2>
        {flight.from} to {flight.to} - {flight.date}
      </h2>
      <div className="row mt-4">
        {flight.seats.map((seat) => (
          <div key={seat.id} className="col-2 mb-3">
            <button
              className={`btn ${
                seat.available
                  ? selectedSeat === seat.id
                    ? "btn-success"
                    : "btn-outline-primary"
                  : "btn-secondary"
              }`}
              onClick={() => seat.available && handleSeatSelection(seat.id)}
              disabled={!seat.available}
            >
              {seat.id}
            </button>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={handleContinue}
        disabled={!selectedSeat}
      >
        Continue to Billing
      </button>
    </div>
  );
}
