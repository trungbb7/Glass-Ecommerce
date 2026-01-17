enum OrderStatus  {
    Pending ='PENDING',
    Shipped = 'SHIPPED',
    Delivering = 'DELIVERING',
    Delivered = 'DELIVERED',
    Cancelled = 'CANCELLED',
    Done = 'DONE',
}
interface OrderResult {
    orderId: string;
    isSuccessful: boolean;
    items: Array<{
        productId: string;
        name?: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    discountAmount: number;
    finalAmount: number;
    orderDate: string;
}
export default OrderStatus;
export type { OrderResult };