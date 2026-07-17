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