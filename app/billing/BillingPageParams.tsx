"use client";

import { useSearchParams } from "next/navigation";
import { flights } from "../data/flightData";
import BillingPageClient from "./BillingPageClient";

export default function BillingPageParams() {
  const params = useSearchParams();

  const flightId = params.get("flightId") ?? "";
  const seats = params.get("seats") ?? "";
  const totalPrice = params.get("totalPrice") ?? "";

  const flight = flights.find((f) => f.id === flightId);

  if (!flight) {
    return <div>Flight not found</div>;
  }

  return (
    <BillingPageClient flight={flight} seats={seats} totalPrice={totalPrice} />
  );
}
