import Container from "@/components/ui/container";

import BookingHeader from "@/features/booking/components/booking-header";
import BookingFilter from "@/features/booking/components/booking-filter";
import BookingGrid from "@/features/booking/components/booking-grid";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#020617] py-20">
      <Container>
        <BookingHeader />

        <div className="mt-12">
          <BookingFilter />
        </div>

        <BookingGrid />
      </Container>
    </main>
  );
}
