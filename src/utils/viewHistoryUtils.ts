import type {CartProduct, Product, ProductVariant} from "@/types/product";

export function addViewHistoryProduct(product: Product) {
  const historyString = localStorage.getItem("view-history") || "[]";
  let productList = JSON.parse(historyString) as Product[];
  productList = productList.filter((item) => item.id !== product.id);
  productList.unshift(product);
  localStorage.setItem("view-history", JSON.stringify(productList));
}

export function getViewHistoryProducts() {
  const historyString = localStorage.getItem("view-history") || "[]";
  const productList = JSON.parse(historyString) as Product[];
  return productList;
}
export function getCartItems(){
    const cartString = localStorage.getItem("cart-items") || "[]";
  return JSON.parse(cartString) as CartProduct[];
}
export function setCartItems(items: CartProduct[]){
    localStorage.setItem("cart-items", JSON.stringify(items));
}
export function addCartItem(item: CartProduct){
    const cartItems = getCartItems();
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id && cartItem.selectedVariant === item.selectedVariant);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += item.quantity;
    } else {
        cartItems.push(item);
    }
    setCartItems(cartItems);
}
export function removeCartItem(itemId: string, selectedVariant: ProductVariant){
    let cartItems = getCartItems();
    cartItems = cartItems.filter((cartItem) => {
        return !(cartItem.id === itemId && cartItem.selectedVariant === selectedVariant);
    });
    setCartItems(cartItems);
}
export function updateCartItemQuantity(itemId: string, selectedVariant: ProductVariant, quantity: number){
    const cartItems = getCartItems();
    const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === itemId && cartItem.selectedVariant === selectedVariant);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = quantity;
        setCartItems(cartItems);
    }
}