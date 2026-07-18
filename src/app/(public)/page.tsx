"use client";
import Hero from "../../components/landing/hero";
import About from "@/components/landing/about";
import Courts from "@/components/landing/courts";
import Footer from "@/components/landing/footer";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response.types";
import { Venue } from "@/types/venue.types";
import { useState } from "react";


export default function LandingPage() {
 const [venueData, setVenueData] = useState<Venue>()
 useQuery({
    queryKey: ["venue"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Venue>>("/venue");
      setVenueData(res.data.data)
      return res.data.data
    }
  })
  return (
    <main className="bg-[#020617] text-white overflow-x-hidden">
      <Hero totalCourt={String(venueData?.courts.length)} />
      <About facilities={venueData?.facilities} />
      <Courts courts={venueData?.courts}/>
      <Footer />
      <div>
        {venueData?.name}
        </div>
    </main>
  );
}
