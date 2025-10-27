export interface Customer {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id?: string;
  customer: string | Customer; // 👈 Fix — can be either an ID string OR populated Customer object
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  createdAt?: string;
  updatedAt?: string;
}
