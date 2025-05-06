import { Suspense } from "react";
import BillingPageParams from "./BillingPageParams";

export default function BillingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingPageParams />
    </Suspense>
  );
}
