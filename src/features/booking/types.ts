export interface Court {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  capacity: number;
  open: string;
  close: string;
  features: string[];
}