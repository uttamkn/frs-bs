
import { Suspense } from 'react';
import { flights } from '../data/flightData';
import BillingPageClient from './BillingPageClient';

export default async function BillingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const flightId = await searchParams.flightId as string;
  const seats = await searchParams.seats as string;
  const totalPrice = await searchParams.totalPrice as string;

  const flight = flights.find((f) => f.id === flightId);

  if (!flight) {
    return <div>Flight not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingPageClient flight={flight} seats={seats} totalPrice={totalPrice} />
    </Suspense>
  );
}


