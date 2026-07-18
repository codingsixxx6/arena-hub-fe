import {
  SportType,
} from "./venue.types";

export type AvailabilitySlot = {
  startTime: string;
  endTime: string;
  available: boolean;
};

export type CourtAvailability = {
  court:{
    id: string,
    name: string,
    sportType: SportType,
    pricePerHour: number
  }
  slots: AvailabilitySlot[];
};