"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SeatInfo } from "./types"
import SeatInfoCard from "./SeatInfoCard"
import { Flight, flights } from "../data/flightData"
import { Plane } from 'lucide-react'

const ROWS = 10
const SEATS_PER_ROW = 4

export default function SeatSelectionPage() {
  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([])
  const [currentSeat, setCurrentSeat] = useState<SeatInfo | null>(null)
  const [flight, setFlight] = useState<Flight | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const flightId = searchParams.get("flightId")
    if (flightId) {
      const selectedFlight = flights.find((f) => f.id === flightId)
      if (selectedFlight) {
        setFlight(selectedFlight)
      } else {
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [searchParams, router])

  const getSeatClass = (row: number) => {
    if (row <= 2) return "Business"
    return "Economy"
  }

  const getSeatPrice = (row: number) => {
    if (!flight) return 0
    const basePrice = flight.price
    if (row <= 2) return basePrice * 1.5
    if (row <= 5) return basePrice * 1.2
    return basePrice
  }

  const handleSeatClick = (row: number, seat: number) => {
    const seatNumber = `${row}${String.fromCharCode(64 + seat)}`
    const existingSeat = selectedSeats.find((s) => s.number === seatNumber)

    if (existingSeat) {
      setCurrentSeat(existingSeat)
    } else {
      const seatInfo: SeatInfo = {
        number: seatNumber,
        price: getSeatPrice(row),
        class: getSeatClass(row),
      }
      setCurrentSeat(seatInfo)
    }
  }

  const handleSelectSeat = (seat: SeatInfo) => {
    setSelectedSeats([...selectedSeats, seat])
    setCurrentSeat(null)
  }

  const handleUnselectSeat = (seat: SeatInfo) => {
    setSelectedSeats(selectedSeats.filter((s) => s.number !== seat.number))
    setCurrentSeat(null)
  }

  const isSeatSelected = (seatNumber: string) => {
    return selectedSeats.some((seat) => seat.number === seatNumber)
  }

  const handleCheckout = () => {
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
    router.push(
      `/billing?flightId=${flight?.id}&seats=${selectedSeats.length}&totalPrice=${totalPrice}`
    )
  }

  if (!flight) return null

  return (
    <div className="container py-5 min-vh-100 position-relative">
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-light opacity-50" style={{ zIndex: -1 }} />
      <div className="card shadow mb-5">
        <div className="card-body text-center p-4">
          <h1 className="card-title display-5 fw-bold mb-3">Select Your Seat</h1>
          <div className="d-flex align-items-center justify-content-center fs-5 mb-2">
            <span className="fw-semibold">{flight.from}</span>
            <i className="bi bi-arrow-right mx-2"></i>
            <span className="fw-semibold">{flight.to}</span>
          </div>
          <div className="text-muted">Flight: {flight.id}</div>
        </div>
      </div>
      <div className="position-relative mx-auto" style={{ maxWidth: "400px" }}>
        <Plane className="position-absolute" style={{ top: "-3rem", left: "-3rem", width: "6rem", height: "6rem", transform: "rotate(-45deg)", color: "#e9ecef" }} />
        <div className="row row-cols-4 g-2">
          {Array.from({ length: ROWS }, (_, row) =>
            Array.from({ length: SEATS_PER_ROW }, (_, seat) => {
              const seatNumber = `${row + 1}${String.fromCharCode(65 + seat)}`
              const isSelected = isSeatSelected(seatNumber)
              return (
                <div className="col" key={seatNumber}>
                  <button
                    className={`btn w-100 aspect-ratio-1x1 d-flex flex-column align-items-center justify-content-center ${
                      getSeatClass(row + 1) === "Business" ? "btn-primary" : "btn-secondary"
                    } ${isSelected ? "btn-success" : ""}`}
                    onClick={() => handleSeatClick(row + 1, seat + 1)}
                  >
                    <small>{seatNumber}</small>
                    {getSeatClass(row + 1) === "Business" && (
                      <span className="badge bg-light text-dark mt-1" style={{ fontSize: "0.6rem" }}>
                        Business
                      </span>
                    )}
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
      {currentSeat && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
          <div className="bg-white rounded-3 shadow-lg m-3" style={{ maxWidth: "400px", width: "100%" }}>
            <SeatInfoCard
              seat={currentSeat}
              onClose={() => setCurrentSeat(null)}
              onSelect={handleSelectSeat}
              onUnselect={handleUnselectSeat}
              isSelected={isSeatSelected(currentSeat.number)}
            />
          </div>
        </div>
      )}
      {selectedSeats.length > 0 && (
        <div className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1040 }}>
          <button className="btn btn-primary btn-lg shadow" onClick={handleCheckout}>
            Checkout ({selectedSeats.length} seats)
          </button>
        </div>
      )}
    </div>
  )
}

