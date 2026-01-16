import CartItem, {EmptyCardAlert} from "@/components/pages/Cart/CartItem/CartItem.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Header} from "@/components/Header/index.ts";
import {useNavigate} from "react-router-dom";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from "@/components/ui/item.tsx";
import {VoucherDialog} from "@/components/Voucher/Voucher.tsx";
import {formatCurrency} from "@/utils/formattor.ts";
export interface CartItemType {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    category?: string;
    isSelected?: boolean;
}
export default function Cart({items}: {items?: CartItemType[]}) {
    const navigate = useNavigate();
    const totalItems = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const totalPrice = items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

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
        <div className="">
            <Header></Header>
            <div className="flex h-full flex-col m-8 content-between">
                <section className="product-list">
                    <div className="flex items-center space-x-2 m-2">
                        <Checkbox className="w-5 h-5 mt-2"></Checkbox>
                        <Label className='text-lg'>Chọn tất cả</Label>
                    </div>
                    {renderedItems?.length === 0 ?
                        <EmptyCardAlert></EmptyCardAlert> : renderedItems}
                </section>
                {/* Summary bar */}
                <section className="fixed bottom-0 left-0 w-full z-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-white shadow-lg rounded-t-lg">
                            <Item className='flex flex-row gap-2 justify-between p-4'>
                                <ItemContent>
                                    <ItemTitle className="text-lg">Đã chọn</ItemTitle>
                                    <ItemDescription className="text-lg">{totalItems}</ItemDescription>
                                </ItemContent>
                                <ItemContent className="flex flex-row gap-4">
                                    <ItemTitle>Tổng cộng</ItemTitle>
                                    <ItemDescription className="text-lg">{formatCurrency(totalPrice)}</ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <VoucherDialog></VoucherDialog>
                                    <Button
                                        className="w-full max-w-48"
                                        size="lg"
                                        onClick={()=> navigate("/checkout")}>Thanh toán</Button>
                                </ItemActions>
                            </Item>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

async function handleOrder(orderItems: CartItemType[]) {
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({items: orderItems}),
    });
    if (!response.ok) {
        throw new Error('Failed to place order');
    }
    return await response.json();

}
