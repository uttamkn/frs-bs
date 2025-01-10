'use client';

import { useRouter } from 'next/navigation';
import { Flight } from '../data/flightData';

interface BillingPageClientProps {
  flight: Flight;
  seats: string;
  totalPrice: string;
}

export default function BillingPageClient({ flight, seats, totalPrice }: BillingPageClientProps) {
  const router = useRouter();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="display-4 text-center mb-5">Billing Information</h1>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">Flight Details</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <h5 className="text-muted">Flight</h5>
                  <p className="h5">{flight.id}</p>
                </div>
                <div className="col-sm-6 mb-3">
                  <h5 className="text-muted">Route</h5>
                  <p className="h5">{flight.from} to {flight.to}</p>
                </div>
                <div className="col-sm-6 mb-3">
                  <h5 className="text-muted">Departure</h5>
                  <p className="h5">{flight.departureTime}</p>
                </div>
                <div className="col-sm-6 mb-3">
                  <h5 className="text-muted">Arrival</h5>
                  <p className="h5">{flight.arrivalTime}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">
              <h2 className="h4 mb-0">Booking Summary</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <h5 className="text-muted">Total Seats</h5>
                  <p className="h5">{seats}</p>
                </div>
                <div className="col-sm-6 mb-3">
                  <h5 className="text-muted">Total Price</h5>
                  <p className="h5">${totalPrice}</p>
                </div>
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-lg w-100 mb-3">
            Proceed to Payment
          </button>
          <button 
            className="btn btn-outline-secondary w-100"
            onClick={() => router.back()}
          >
            Back to Flight Selection
          </button>
        </div>
      </div>
    </div>
  );
}

