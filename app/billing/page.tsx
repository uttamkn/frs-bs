"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Flight, flights } from "../data/flightData";

export default function BillingPage() {
  const [flight, setFlight] = useState<Flight | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const flightId = searchParams.get("flightId");
  const seats = searchParams.get("seats");
  const totalPrice = searchParams.get("totalPrice");

  useEffect(() => {
    if (flightId) {
      const selectedFlight = flights.find((f) => f.id === flightId);
      if (selectedFlight) {
        setFlight(selectedFlight);
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [flightId, router]);

  if (!flight) return null;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Billing Information</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Flight Details</h5>
            </div>
            <div className="card-body">
              <p>
                <strong>Flight:</strong> {flight.id}
              </p>
              <p>
                <strong>From:</strong> {flight.from}
              </p>
              <p>
                <strong>To:</strong> {flight.to}
              </p>
              <p>
                <strong>Departure:</strong> {flight.departureTime}
              </p>
              <p>
                <strong>Arrival:</strong> {flight.arrivalTime}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Booking Summary</h5>
            </div>
            <div className="card-body">
              <p>
                <strong>Total Seats:</strong> {seats}
              </p>
              <p>
                <strong>Total Price:</strong> ${totalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary w-100">Proceed to Payment</button>
    </div>
  );
}
