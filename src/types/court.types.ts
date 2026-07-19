export enum SportType {
  BADMINTON = "BADMINTON",
  FUTSAL = "FUTSAL",
  BASKET = "BASKET",
  MINI_SOCCER = "MINI_SOCCER",
  TENNIS = "TENNIS",
  PADEL = "PADEL",
}

export enum CourtStatus {
  AVAILABLE = "AVAILABLE",
  MAINTENANCE = "MAINTENANCE",
  INACTIVE = "INACTIVE",
}
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

export type Court = {
   name: string;
    id: string;
    venueId: string;
    sportType: SportType;
    pricePerHour: number;
    status: CourtStatus;
}

export interface CreateCourtPayload {
  name: string;
  sportType: SportType;
  pricePerHour: number;
}

export interface UpdateCourtPayload {
  name: string;
  sportType: SportType;
  pricePerHour: number;
  status: CourtStatus;
}

export interface CourtFormData {
  name: string;
  sportType: SportType | "";
  pricePerHour: number | "";
}