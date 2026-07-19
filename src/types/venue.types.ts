import { CourtStatus, SportType } from "./court.types";


export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export type VenueImage = {
  id: string;
  venueId: string;
  imageUrl: string;
  publicId: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type Facility = {
  id: string;
  name: string;
  icon: string;
  description: string;
  imageUrl: string;
};

export type OperatingHour = {
  dayOfWeek: DayOfWeek;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
};

export type Court = {
  id: string;
  name: string;
  sportType: SportType;
  pricePerHour: number;
  status: CourtStatus;
  imageUrl: string;
};

export type Venue = {
  id: string;
  name: string;
  description: string | null;
  phoneNumber: string | null;
  address: string;
  city: string;
  images: VenueImage[];
  facilities: Facility[];
  operatingHours: OperatingHour[];
  courts: Court[];
};

export type VenueAdminResponse = {
  id: string;
  name: string;
  description: string | null;
  phoneNumber: string | null;
  address: string;
  city: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  images: VenueImage[];
  facilities: Facility[];
  operatingHours: OperatingHour[];
  courts: Court[];
}

export interface VenueUpdatePayload {
  name?: string;
  description?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
}

export interface VenueForm {
  name: string;
  description: string;
  phoneNumber: string;
  address: string;
  city: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
}