import CartItem, {EmptyCardAlert} from "@/components/pages/Cart/CartItem/CartItem.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Header} from "@/components/Header/index.ts";
import {useNavigate} from "react-router-dom";
import OrderSummary, {OrderSummarySimple} from "@/components/pages/Cart/CartItem/OrderSummary.tsx";
export interface CartItemType {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    category?: string;
}
export default function Cart({items}: {items?: CartItemType[]}) {
    const navigate = useNavigate();

    //sample data
    const sampleItems: CartItemType[] = [
        {
            id: "1",
            name: "Product 1",
            price: 29.99,
            quantity: 2,
            imageUrl: "https://via.placeholder.com/150",
            category: "Category 1",
        },
        {
            id: "2",
            name: "Product 2",
            price: 49.99,
            quantity: 1,
            imageUrl: "https://via.placeholder.com/150",
            category: "Category 2",
        },
        {
            id: "3",
            name: "Product 2",
            price: 49.99,
            quantity: 1,
            imageUrl: "https://via.placeholder.com/150",
            category: "Category 2",
        },
    ];
    items = items || sampleItems;
    const renderedItems = items?.map((item) => (
        <CartItem key={item.id} item={item}></CartItem>
    ));
    //use shadcn components
    return (
        <>
            <Header></Header>
            <h1 className="flex font-semibold justify-center my-8">Cart page</h1>
            <div>
                <div className="cart-page layout-padding gap-8 flex flex-col m-8">
                    <section className="product-list">
                        {renderedItems?.length === 0 ?
                        <EmptyCardAlert></EmptyCardAlert> : renderedItems}
                    </section>
                    <section className="mt-4 w-full max-w-8/10 flex flex-col gap-6 bottom-0 position-sticky">
                        <OrderSummarySimple
                            chosenItems={renderedItems?.length ?? 0}></OrderSummarySimple>
                    </section>
                </div>
            </div>
        </>
    );
}
