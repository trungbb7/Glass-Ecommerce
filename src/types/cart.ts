import type { Product } from "./product";

export interface CartItem {
    productId: string;
    quantity: number;
    selectedColor: string;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
}

export interface CartItemWithProduct extends CartItem {
    product: Product;
}
