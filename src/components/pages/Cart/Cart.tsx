import CartItem from "@/components/pages/Cart/CartItem/CartItem.tsx";
import OrderSummary from "@/components/pages/Cart/CartItem/OrderSummary.tsx";

export default function Cart() {
    return (
        <>
            <p>Cart page</p>
            <section className="product-list">
                <CartItem></CartItem>
                <CartItem></CartItem>
                <CartItem></CartItem>
            </section>
            <section>
                <OrderSummary></OrderSummary>
            </section>
        </>
    );
}
