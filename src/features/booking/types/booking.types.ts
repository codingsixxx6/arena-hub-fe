export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  available: boolean;
}

export interface Court {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  capacity: number;
  indoor: boolean;
  features: string[];
  slots: TimeSlot[];
}