import { Court } from "../types/booking.types";

export const dummyCourts: Court[] = [
  {
    id: 1,
    name: "Court 1",
    image: "/images/Court-first.png",
    description:
      "Premium indoor court dengan standar internasional.",
    rating: 4.9,
    capacity: 4,
    indoor: true,
    features: [
      "Indoor",
      "LED Lighting",
      "Premium Turf",
      "Tournament Standard",
    ],
    slots: [
      {
        id: "1",
        startTime: "08:00",
        endTime: "09:00",
        price: 150000,
        available: true,
      },
      {
        id: "2",
        startTime: "09:00",
        endTime: "10:00",
        price: 150000,
        available: false,
      },
      {
        id: "3",
        startTime: "10:00",
        endTime: "11:00",
        price: 150000,
        available: true,
      },
    ],
  },
  {
    id: 2,
    name: "Court 2",
    image: "/images/Court-second.png",
    description:
      "Lapangan premium dengan pencahayaan profesional.",
    rating: 4.9,
    capacity: 4,
    indoor: true,
    features: [
      "Indoor",
      "Premium Surface",
      "Comfort Zone",
      "LED Lighting",
    ],
    slots: [
      {
        id: "1",
        startTime: "08:00",
        endTime: "09:00",
        price: 150000,
        available: true,
      },
      {
        id: "2",
        startTime: "09:00",
        endTime: "10:00",
        price: 150000,
        available: true,
      },
      {
        id: "3",
        startTime: "10:00",
        endTime: "11:00",
        price: 150000,
        available: false,
      },
    ],
  },
];