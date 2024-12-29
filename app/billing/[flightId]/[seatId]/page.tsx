"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { flightData } from "../../../data/flightData";

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  price: number;
}

export default function Billing() {
  const params = useParams();
  const [flight, setFlight] = useState<Flight | null>(null);

  useEffect(() => {
    const selectedFlight = flightData.flights.find(
      (f: Flight) => f.id === params.flightId
    );
    setFlight(selectedFlight || null);
  }, [params.flightId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Payment processed successfully!");
  };

  if (!flight) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Billing</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Flight Details</h5>
          <p className="card-text">From: {flight.from}</p>
          <p className="card-text">To: {flight.to}</p>
          <p className="card-text">Date: {flight.date}</p>
          <p className="card-text">Seat: {params.seatId}</p>
          <p className="card-text">Price: ${flight.price}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">
            Card Number
          </label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">
            Expiry Date
          </label>
          <input
            type="text"
            className="form-control"
            id="expiryDate"
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">
            CVV
          </label>
          <input type="text" className="form-control" id="cvv" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Pay ${flight.price}
        </button>
      </form>
    </div>
  );
}
