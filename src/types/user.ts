export interface User {
  id?: string;
  email: string;
  password?: string;
  role?: string;
  fullName?: string;
  address?: string;
  tel?: string;
  token?: string;
  avatar?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
}
