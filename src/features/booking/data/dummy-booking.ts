import { Court } from "../types/booking.types";

export const dummyCourts: Court[] = [
  {
    id: 1,
    name: "Lapangan 1",
    image: "/images/First-court.png",
    description:
      "Court utama Arena Hub dengan pencahayaan profesional dan permukaan premium berstandar internasional.",
    rating: 4.9,
    capacity: 4,
    indoor: true,
    features: [
      "Indoor Court",
      "Professional LED Lighting",
      "Premium Artificial Turf",
      "International Standard",
    ],
    slots: [
      {
        id: "1-1",
        startTime: "08:00",
        endTime: "09:00",
        price: 200000,
        available: true,
      },
      {
        id: "1-2",
        startTime: "09:00",
        endTime: "10:00",
        price: 200000,
        available: false,
      },
      {
        id: "1-3",
        startTime: "10:00",
        endTime: "11:00",
        price: 200000,
        available: true,
      },
    ],
  },

  {
    id: 2,
    name: " Lapangan 2",
    image: "/images/Second-court.png",
    description:
      "Court premium dengan area bermain yang nyaman dan kualitas lapangan yang konsisten.",
    rating: 4.9,
    capacity: 4,
    indoor: true,
    features: [
      "Indoor Court",
      "Professional LED Lighting",
      "Premium Artificial Turf",
      "International Standard",
    
    ],
    slots: [
      {
        id: "2-1",
        startTime: "08:00",
        endTime: "09:00",
        price: 200000,
        available: true,
      },
      {
        id: "2-2",
        startTime: "09:00",
        endTime: "10:00",
        price: 200000,
        available: true,
      },
      {
        id: "2-3",
        startTime: "10:00",
        endTime: "11:00",
        price: 200000,
        available: false,
      },
    ],
  },

  {
    id: 3,
    name: "Lapangan 3",
    image: "/images/Third-court.png",
    description:
      "Pilihan ideal untuk latihan maupun pertandingan dengan fasilitas premium Arena Hub.",
    rating: 4.9,
    capacity: 4,
    indoor: true,
    features: [
      "Indoor Court",
      "Professional LED Lighting",
      "Premium Artificial Turf",
      "International Standard",
    ],
    slots: [
      {
        id: "3-1",
        startTime: "08:00",
        endTime: "09:00",
        price: 200000,
        available: false,
      },
      {
        id: "3-2",
        startTime: "09:00",
        endTime: "10:00",
        price: 200000,
        available: true,
      },
      {
        id: "3-3",
        startTime: "10:00",
        endTime: "11:00",
        price: 200000,
        available: true,
      },
    ],
  },

  {
    id: 4,
    name: "Lapangan 4",
    image: "/images/Fourth-court.png",
    description:
      "Court dengan standar profesional yang cocok untuk permainan santai maupun kompetitif.",
    rating: 4.9,
    capacity: 4,
    indoor: true,
    features: [
      "Indoor Court",
      "Professional LED Lighting",
      "Premium Artificial Turf",
      "International Standard",
    ],
    slots: [
      {
        id: "4-1",
        startTime: "08:00",
        endTime: "09:00",
        price: 200000,
        available: true,
      },
      {
        id: "4-2",
        startTime: "09:00",
        endTime: "10:00",
        price: 200000,
        available: false,
      },
      {
        id: "4-3",
        startTime: "10:00",
        endTime: "11:00",
        price: 200000,
        available: true,
      },
    ],
  },
];
