'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Flight {
  id: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  price: number
}

const flights: Flight[] = [
  { id: 'FL001', from: 'New York', to: 'Los Angeles', departureTime: '2023-07-01 10:00 AM', arrivalTime: '2023-07-01 1:00 PM', price: 300 },
  { id: 'FL002', from: 'Chicago', to: 'Miami', departureTime: '2023-07-02 11:00 AM', arrivalTime: '2023-07-02 2:30 PM', price: 250 },
  { id: 'FL003', from: 'San Francisco', to: 'Seattle', departureTime: '2023-07-03 9:00 AM', arrivalTime: '2023-07-03 11:00 AM', price: 200 },
]

export default function FlightListPage() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const router = useRouter()

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight)
  }

  const handleProceedToSeatSelection = () => {
    if (selectedFlight) {
      router.push(`/seat-selection?flightId=${selectedFlight.id}`)
    }
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Available Flights</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {flights.map((flight) => (
          <div key={flight.id} className="col">
            <div className={`card h-100 ${selectedFlight?.id === flight.id ? 'border-primary' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-airplane-engines me-2"></i>
                  {flight.from} to {flight.to}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Flight: {flight.id}</h6>
                <div className="mb-3">
                  <p className="card-text mb-1">
                    <i className="bi bi-clock me-2"></i>
                    Departure: {flight.departureTime}
                  </p>
                  <p className="card-text mb-1">
                    <i className="bi bi-clock-history me-2"></i>
                    Arrival: {flight.arrivalTime}
                  </p>
                </div>
                <p className="card-text">
                  <strong>
                    <i className="bi bi-tag-fill me-2"></i>
                    Price: ${flight.price}
                  </strong>
                </p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <button 
                  className={`btn btn-outline-primary w-100 ${selectedFlight?.id === flight.id ? 'active' : ''}`}
                  onClick={() => handleSelectFlight(flight)}
                >
                  {selectedFlight?.id === flight.id ? 'Selected' : 'Select Flight'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedFlight && (
        <div className="mt-5 text-center">
          <h2>Selected Flight: {selectedFlight.id}</h2>
          <p className="lead">
            {selectedFlight.from} to {selectedFlight.to} on {selectedFlight.departureTime}
          </p>
          <button 
            className="btn btn-success btn-lg"
            onClick={handleProceedToSeatSelection}
          >
            Proceed to Seat Selection
          </button>
        </div>
      )}
    </div>
  )
}


