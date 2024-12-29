"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SeatInfo } from "./types";
import SeatInfoCard from "./SeatInfoCard";
import Image from "next/image";
import { Flight, flights } from "../data/flightData";

const ROWS = 10;
const SEATS_PER_ROW = 4;

export default function SeatSelectionPage() {
  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([]);
  const [currentSeat, setCurrentSeat] = useState<SeatInfo | null>(null);
  const [flight, setFlight] = useState<Flight | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const flightId = searchParams.get("flightId");
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
  }, [searchParams, router]);

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
    <div className="container position-relative min-vh-100 py-4">
      <Image
        src="/placeholder.svg?height=800&width=1200"
        alt="Plane top view"
        layout="fill"
        objectFit="contain"
        className="opacity-25"
      />
      <h1 className="text-center mb-4 position-relative">Select Your Seat</h1>
      <h2 className="text-center mb-4 position-relative">
        Flight: {flight.id} - {flight.from} to {flight.to}
      </h2>
      <div className="position-relative">
        <div className="mx-auto" style={{ maxWidth: "400px" }}>
          <div className="row row-cols-4 g-2">
            {Array.from({ length: ROWS }, (_, row) =>
              Array.from({ length: SEATS_PER_ROW }, (_, seat) => {
                const seatNumber = `${row + 1}${String.fromCharCode(
                  65 + seat
                )}`;
                const isSelected = isSeatSelected(seatNumber);
                return (
                  <div className="col" key={seatNumber}>
                    <button
                      className={`btn btn-sm w-100 aspect-ratio-1x1 d-flex flex-column align-items-center justify-content-center ${
                        getSeatClass(row + 1) === "Business"
                          ? "btn-primary"
                          : "btn-secondary"
                      } ${isSelected ? "btn-success" : ""}`}
                      onClick={() => handleSeatClick(row + 1, seat + 1)}
                    >
                      <i className="bi bi-ticket-perforated"></i>
                      <small>{seatNumber}</small>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {currentSeat && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
        >
          <div
            className="bg-white rounded-3 shadow-lg m-3"
            style={{ maxWidth: "400px", width: "100%" }}
          >
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
        <div
          className="position-fixed bottom-0 end-0 m-4"
          style={{ zIndex: 1040 }}
        >
          <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout ({selectedSeats.length} seats)
          </button>
        </div>
      )}
    </div>
  );
}
