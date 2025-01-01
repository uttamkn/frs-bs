'use client'

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Flight, flights } from "./data/flightData"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function FlightListPage() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const router = useRouter()

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight)
  }

  const handleProceedToSeatSelection = () => {
    if (selectedFlight) {
      router.push(`/seat-selection?flightId=${selectedFlight.id}`)
    }
  }

  const filteredAndSortedFlights = useMemo(() => {
    return flights
      .filter(flight =>
        flight.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.to.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price
        if (sortBy === "departureTime") return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
        return 0
      })
  }, [searchTerm, sortBy])

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light')
  }, [])

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="text-center">Available Flights</h1>
        <ThemeToggle />
      </div>
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search flights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Price: Low to High</option>
            <option value="departureTime">Departure Time</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredAndSortedFlights.map((flight) => (
          <div key={flight.id} className="col">
            <div
              className={`card h-100 ${selectedFlight?.id === flight.id ? "border-primary" : ""}`}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-airplane me-2"></i>
                  {flight.from} to {flight.to}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Flight: {flight.id}
                </h6>
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
                  className={`btn btn-outline-primary w-100 ${selectedFlight?.id === flight.id ? "active" : ""}`}
                  onClick={() => handleSelectFlight(flight)}
                >
                  {selectedFlight?.id === flight.id ? "Selected" : "Select Flight"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedFlight && (
        <div className="mt-5 text-center">
          <h2>Selected Flight: {selectedFlight.id}</h2>
          <p className="lead mb-2">
            {selectedFlight.from} to {selectedFlight.to}
          </p>
          <p className="mb-4">
            Departure: {selectedFlight.departureTime} | Arrival: {selectedFlight.arrivalTime}
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleProceedToSeatSelection}
          >
            Proceed to Seat Selection
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      )}
    </div>
  )
}


