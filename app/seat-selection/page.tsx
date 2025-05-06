"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SeatInfo } from "./types";
import SeatInfoCard from "./SeatInfoCard";
import { Flight, flights } from "../data/flightData";
import { ArrowRight } from "lucide-react";

const ROWS = 10;
const SEATS_PER_ROW = 6;

export default function SeatSelectionPage() {
  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([]);
  const [currentSeat, setCurrentSeat] = useState<SeatInfo | null>(null);
  const [flight, setFlight] = useState<Flight | null>(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flightId = params.get("flightId");

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
  }, [router]);

  const getSeatClass = (row: number) => {
    if (row <= 2) return "Business";
    return "Economy";
  };

  const getSeatPrice = (row: number) => {
    if (!flight) return 0;
    const basePrice = flight.price;
    if (row <= 2) return basePrice * 1.5;
    if (row <= 5) return basePrice * 1.2;
    return basePrice;
  };

  const handleSeatClick = (row: number, seat: number) => {
    const seatNumber = `${row}${String.fromCharCode(64 + seat)}`;
    const existingSeat = selectedSeats.find((s) => s.number === seatNumber);

    if (existingSeat) {
      setCurrentSeat(existingSeat);
    } else {
      const seatInfo: SeatInfo = {
        number: seatNumber,
        price: getSeatPrice(row),
        class: getSeatClass(row),
      };
      setCurrentSeat(seatInfo);
    }
  };

  const handleSelectSeat = (seat: SeatInfo) => {
    setSelectedSeats([...selectedSeats, seat]);
    setCurrentSeat(null);
  };

  const handleUnselectSeat = (seat: SeatInfo) => {
    setSelectedSeats(selectedSeats.filter((s) => s.number !== seat.number));
    setCurrentSeat(null);
  };

  const isSeatSelected = (seatNumber: string) => {
    return selectedSeats.some((seat) => seat.number === seatNumber);
  };

  const handleCheckout = () => {
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    router.push(
      `/billing?flightId=${flight?.id}&seats=${selectedSeats.length}&totalPrice=${totalPrice}`
    );
  };

  if (!flight) return null;

  return (
    <div className={`container-fluid py-5 min-vh-100 card-body`}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card border mb-5">
            <div className="card-body text-center p-5">
              <h1 className="card-title display-4 fw-bold mb-4">
                Select Your Seat
              </h1>
              <div className="d-flex align-items-center justify-content-center fs-5 mb-3">
                <span className="fw-semibold">{flight.from}</span>
                <ArrowRight className="mx-3" />
                <span className="fw-semibold">{flight.to}</span>
              </div>
              <div className="d-flex justify-content-center text-muted mb-4">
                <div className="d-flex align-items-center me-4">
                  <span>Flight: {flight.id}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card border">
            <div className="card-body p-4">
              <div
                className="position-relative mx-auto mb-5"
                style={{ maxWidth: "500px" }}
              >
                <div className="row row-cols-4 g-2">
                  {Array.from({ length: ROWS }, (_, row) =>
                    Array.from({ length: SEATS_PER_ROW }, (_, seat) => {
                      const seatNumber = `${row + 1}${String.fromCharCode(
                        65 + seat
                      )}`;
                      const isSelected = isSeatSelected(seatNumber);
                      const seatClass = getSeatClass(row + 1);
                      return (
                        <div className="col" key={seatNumber}>
                          <button
                            className={`btn w-100 aspect-ratio-1x1 d-flex flex-column align-items-center justify-content-center ${
                              seatClass === "Business"
                                ? "btn-outline-primary"
                                : "btn-outline-secondary"
                            } ${isSelected ? "btn-success" : ""}`}
                            onClick={() => handleSeatClick(row + 1, seat + 1)}
                          >
                            <small>{seatNumber}</small>
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <div className="d-flex align-items-center me-4">
                  <div
                    className="btn btn-outline-primary btn-sm me-2"
                    style={{ width: "20px", height: "20px" }}
                  ></div>
                  <span>Business</span>
                </div>
                <div className="d-flex align-items-center me-4">
                  <div
                    className="btn btn-outline-secondary btn-sm me-2"
                    style={{ width: "20px", height: "20px" }}
                  ></div>
                  <span>Economy</span>
                </div>
                <div className="d-flex align-items-center">
                  <div
                    className="btn btn-success btn-sm me-2"
                    style={{ width: "20px", height: "20px" }}
                  ></div>
                  <span>Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentSeat && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <SeatInfoCard
                seat={currentSeat}
                onClose={() => setCurrentSeat(null)}
                onSelect={handleSelectSeat}
                onUnselect={handleUnselectSeat}
                isSelected={isSeatSelected(currentSeat.number)}
              />
            </div>
          </div>
        </div>
      )}

      {selectedSeats.length > 0 && (
        <div className="w-100 p-3 card-body" style={{ zIndex: 1040 }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <span className="fs-5 fw-bold">
                  {selectedSeats.length} seat
                  {selectedSeats.length > 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
