import type { ShippingAddress } from "./user";

const OrderStatus = {
    Pending: 'PENDING',
    Shipped: 'SHIPPED',
    Delivering: 'DELIVERING',
    Delivered: 'DELIVERED',
    Cancelled: 'CANCELLED',
    Done: 'DONE',
} as const;

type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    selectedColor?: string;
    imageUrl?: string;
}

interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: 'COD' | 'BANKING' | 'MOMO';
    status: OrderStatusType | string;
    totalAmount: number;
    discountAmount: number;
    shippingFee: number;
    finalAmount: number;
    voucherCode?: string | null;
    orderDate: string;
    updatedAt?: string;
}

interface OrderResult {
    orderId: string;
    isSuccessful: boolean;
    items: OrderItem[];
    totalAmount: number;
    discountAmount: number;
    finalAmount: number;
    orderDate: string;
}

export default OrderStatus;
export type { Order, OrderItem, OrderResult, OrderStatusType };
