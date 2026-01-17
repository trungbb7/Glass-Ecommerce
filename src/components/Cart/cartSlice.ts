import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartItemWithProduct } from "@/types/cart";
import type { Product } from "@/types/product";

const API_BASE_URL = "http://localhost:3000";

interface CartState {
    items: CartItemWithProduct[];
    selectedItems: string[]; // productId + color combination
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    selectedItems: [],
    loading: false,
    error: null,
};

// Helper to create unique key for cart item
const getCartItemKey = (productId: string, color: string) => `${productId}-${color}`;

// Async thunk to fetch cart from server
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (userId: string, { rejectWithValue }) => {
        try {
            // Fetch cart
            const cartResponse = await fetch(`${API_BASE_URL}/carts?userId=${userId}`);
            if (!cartResponse.ok) throw new Error("Failed to fetch cart");
            const carts = await cartResponse.json();
            const cart = carts[0];

            if (!cart || !cart.items || cart.items.length === 0) {
                return [];
            }

            // Fetch all products for the cart items
            const productIds = cart.items.map((item: CartItem) => item.productId);
            const productsResponse = await fetch(`${API_BASE_URL}/products?${productIds.map((id: string) => `id=${id}`).join("&")}`);
            if (!productsResponse.ok) throw new Error("Failed to fetch products");
            const products: Product[] = await productsResponse.json();

            // Combine cart items with product data
            const itemsWithProducts: CartItemWithProduct[] = cart.items.map((item: CartItem) => ({
                ...item,
                product: products.find((p) => p.id === item.productId)!,
            })).filter((item: CartItemWithProduct) => item.product);

            return itemsWithProducts;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Async thunk to add item to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (
        { userId, productId, quantity, selectedColor }: { userId: string; productId: string; quantity: number; selectedColor: string },
        { rejectWithValue }
    ) => {
        try {
            // First get the existing cart
            const cartResponse = await fetch(`${API_BASE_URL}/carts?userId=${userId}`);
            const carts = await cartResponse.json();
            let cart = carts[0];

            // Fetch the product
            const productResponse = await fetch(`${API_BASE_URL}/products/${productId}`);
            if (!productResponse.ok) throw new Error("Product not found");
            const product: Product = await productResponse.json();

            if (!cart) {
                // Create new cart
                const newCart = {
                    userId,
                    items: [{ productId, quantity, selectedColor }],
                };
                const createResponse = await fetch(`${API_BASE_URL}/carts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newCart),
                });
                if (!createResponse.ok) throw new Error("Failed to create cart");
                cart = await createResponse.json();
            } else {
                // Check if item exists
                const existingItemIndex = cart.items.findIndex(
                    (item: CartItem) => item.productId === productId && item.selectedColor === selectedColor
                );

                if (existingItemIndex >= 0) {
                    cart.items[existingItemIndex].quantity += quantity;
                } else {
                    cart.items.push({ productId, quantity, selectedColor });
                }

                // Update cart
                const updateResponse = await fetch(`${API_BASE_URL}/carts/${cart.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cart),
                });
                if (!updateResponse.ok) throw new Error("Failed to update cart");
            }

            return {
                productId,
                quantity,
                selectedColor,
                product,
            } as CartItemWithProduct;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Async thunk to update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateQuantity",
    async (
        { userId, productId, selectedColor, quantity }: { userId: string; productId: string; selectedColor: string; quantity: number },
        { rejectWithValue }
    ) => {
        try {
            const cartResponse = await fetch(`${API_BASE_URL}/carts?userId=${userId}`);
            const carts = await cartResponse.json();
            const cart = carts[0];

            if (!cart) throw new Error("Cart not found");

            const itemIndex = cart.items.findIndex(
                (item: CartItem) => item.productId === productId && item.selectedColor === selectedColor
            );

            if (itemIndex === -1) throw new Error("Item not found in cart");

            cart.items[itemIndex].quantity = quantity;

            const updateResponse = await fetch(`${API_BASE_URL}/carts/${cart.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cart),
            });

            if (!updateResponse.ok) throw new Error("Failed to update cart");

            return { productId, selectedColor, quantity };
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Async thunk to remove item from cart
export const removeFromCart = createAsyncThunk(
    "cart/removeItem",
    async (
        { userId, productId, selectedColor }: { userId: string; productId: string; selectedColor: string },
        { rejectWithValue }
    ) => {
        try {
            const cartResponse = await fetch(`${API_BASE_URL}/carts?userId=${userId}`);
            const carts = await cartResponse.json();
            const cart = carts[0];

            if (!cart) throw new Error("Cart not found");

            cart.items = cart.items.filter(
                (item: CartItem) => !(item.productId === productId && item.selectedColor === selectedColor)
            );

            const updateResponse = await fetch(`${API_BASE_URL}/carts/${cart.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cart),
            });

            if (!updateResponse.ok) throw new Error("Failed to update cart");

            return { productId, selectedColor };
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Async thunk to clear cart
export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (userId: string, { rejectWithValue }) => {
        try {
            const cartResponse = await fetch(`${API_BASE_URL}/carts?userId=${userId}`);
            const carts = await cartResponse.json();
            const cart = carts[0];

            if (!cart) return;

            cart.items = [];

            const updateResponse = await fetch(`${API_BASE_URL}/carts/${cart.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cart),
            });

            if (!updateResponse.ok) throw new Error("Failed to clear cart");
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleSelectItem: (state, action: PayloadAction<{ productId: string; selectedColor: string }>) => {
            const key = getCartItemKey(action.payload.productId, action.payload.selectedColor);
            const index = state.selectedItems.indexOf(key);
            if (index === -1) {
                state.selectedItems.push(key);
            } else {
                state.selectedItems.splice(index, 1);
            }
        },
        selectAllItems: (state) => {
            state.selectedItems = state.items.map((item) => getCartItemKey(item.productId, item.selectedColor));
        },
        deselectAllItems: (state) => {
            state.selectedItems = [];
        },
        clearSelectedItems: (state) => {
            state.items = state.items.filter(
                (item) => !state.selectedItems.includes(getCartItemKey(item.productId, item.selectedColor))
            );
            state.selectedItems = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add to cart
            .addCase(addToCart.fulfilled, (state, action) => {
                const existingIndex = state.items.findIndex(
                    (item) => item.productId === action.payload.productId && item.selectedColor === action.payload.selectedColor
                );
                if (existingIndex >= 0) {
                    state.items[existingIndex].quantity += action.payload.quantity;
                } else {
                    state.items.push(action.payload);
                }
            })
            // Update quantity
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                const item = state.items.find(
                    (item) => item.productId === action.payload.productId && item.selectedColor === action.payload.selectedColor
                );
                if (item) {
                    item.quantity = action.payload.quantity;
                }
            })
            // Remove item
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => !(item.productId === action.payload.productId && item.selectedColor === action.payload.selectedColor)
                );
                const key = getCartItemKey(action.payload.productId, action.payload.selectedColor);
                state.selectedItems = state.selectedItems.filter((k) => k !== key);
            })
            // Clear cart
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.selectedItems = [];
            });
    },
});

export const { toggleSelectItem, selectAllItems, deselectAllItems, clearSelectedItems } = cartSlice.actions;
export default cartSlice.reducer;
