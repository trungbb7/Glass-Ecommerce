interface Voucher {
    code: string;
    description: string;
    discountAmount: number;
    minOrderAmount: number;
    expiryDate: string;
    quantity?: number;
}
export type { Voucher };