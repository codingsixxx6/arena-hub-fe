type DashboardPlayer = {
  id: string;
  fullName: string;
};

type DashboardCourt = {
  id: string;
  name: string;
};

export type DashboardSummary = {
  totalBookings: number;
  todayBookings: number;
  pendingVerification: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  todayRevenue: number;
};

export type RevenueChartItem = {
  date: string;
  revenue: number;
};

export type DashboardData = {
  summary: DashboardSummary;
  pendingVerification: DashboardBookingItem[];
  upcomingBookings: DashboardBookingItem[];
  revenueChart: RevenueChartItem[];
};

export type DashboardBookingItem = {
  id: string;
  bookingCode: string;
  player: DashboardPlayer;
  court: DashboardCourt;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  waitingSince?: string;
};
