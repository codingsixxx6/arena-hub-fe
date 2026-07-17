export type CreateBookingPayload = {
  courtId: string;
  date: string;
  slots: string[];
};
export type BookingStatus =
  | "PENDING_PAYMENT"
  | "WAITING_VERIFICATION"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export type CreatedBooking = {
  id: string;
  bookingCode: string;
  player: {
    id: string;
    fullName: string;
    email: string;
  };
  court: {
    id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  totalPrice: number;
  paymentProofUrl: string | null;
  paymentDeadline: string;
  rejectReason: string | null;
  status: BookingStatus;
  createdAt: string;
};

export type BookingDetail = {
  id: string;
  bookingCode: string;
  court: {
    id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  totalPrice: number;
  status: BookingStatus;
  paymentProofUrl: string | null;
  paymentDeadline: string;
  rejectReason: string | null;
  createdAt: string;
};

export type BookingListItem = {
  id: string;
  bookingCode: string;
  court: {
    id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: BookingStatus;
};

export type BookingListResponse = {
  data: BookingListItem[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export type AdminBookingListItem = {
  id: string;
  bookingCode: string;
  player: {
    id: string;
    fullName: string;
  };
  court: {
    id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: BookingStatus;
};

export type AdminBookingDetail = {
  id: string;
  bookingCode: string;
  player: {
    id: string;
    fullName: string;
    email: string;
  };
  court: {
    id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  totalPrice: number;
  paymentProofUrl: string | null;
  paymentDeadline: string;
  rejectReason: string | null;
  status: BookingStatus;
  createdAt: string;
};
