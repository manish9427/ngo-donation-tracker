export interface Donation {
  _id?: string;
  donorName: string;
  foodType: string;
  quantity: number;
  date: string;
  status: 'Pending' | 'Picked Up' | 'Delivered';
}