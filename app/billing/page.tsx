export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { flights } from "../data/flightData";
import BillingPageClient from "./BillingPageClient";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const flightId = searchParams.flightId as string;
  const seats = searchParams.seats as string;
  const totalPrice = searchParams.totalPrice as string;

  const flight = flights.find((f) => f.id === flightId);

  if (!flight) {
    return <div>Flight not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingPageClient
        flight={flight}
        seats={seats}
        totalPrice={totalPrice}
      />
    </Suspense>
  );
}
