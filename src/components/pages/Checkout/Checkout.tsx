import {Header} from "@/components/Header/index.ts";
import type {OrderResult} from "@/types/order.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {CircleAlert, CircleCheck} from "lucide-react";
import {Item, ItemContent, ItemDescription, ItemGroup, ItemTitle} from "@/components/ui/item.tsx";
import {formatCurrency} from "@/utils/formattor.ts";
import {ButtonGroup} from "@/components/ui/button-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";

export default function Checkout() {
    const sampleOrderResult: OrderResult = {
        orderId: "ORD123456",
        isSuccessful: true,
        items: [
            { productId: "PROD1", quantity: 2, price: 50000, name: "Sản phẩm 1" },
            { productId: "PROD2", quantity: 1, price: 150000, name: "Sản phẩm 2" },
        ],
        totalAmount: 250000,
        orderDate: "2024-06-15",
    };
    return (
        <>
            <Header></Header>
            {/*Content*/}
            <CheckoutContent orderResult={sampleOrderResult} />
            <div>

            </div>
        </>
    );
}

function CheckoutContent({orderResult}: {orderResult: OrderResult }) {
    const navigate = useNavigate();
    const isSuccessful = orderResult.isSuccessful;
   /* const renderedItems = orderResult.items.map((item) => (
        <Item key={item.productId} className="flex flex-row justify-between w-full">
            <ItemContent>
                <ItemTitle>{item?.name ??""} x {item.quantity}</ItemTitle>
            </ItemContent>
            <ItemContent>
                <ItemDescription>{formatCurrency(item.price * item.quantity)}</ItemDescription>
            </ItemContent>
        </Item>
    ));*/
    return (
        <div>
            {/*Checkout Form*/}
            <Card className="w-full w-max-8/10 mx-auto mt-10 p-6 flex flex-col items-center space-y-4">
                <CardHeader className="items-center space-y-2">
                    {isSuccessful ?
                        <CircleCheck className="text-green-500"/> :
                        <CircleAlert className="text-red-300"/>
                    }
                    <CardTitle className="text-lg">{orderResult.isSuccessful? "Đặt hàng thành công": "Đặt hàng thất bại"}</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <ItemGroup className="flex flex-col w-full" role="list">
                        <Item size="sm" className="flex flex-row justify-between w-full">
                            <ItemContent>
                                <ItemTitle>Mã đơn hàng:</ItemTitle>
                            </ItemContent>
                            <ItemContent>
                                <ItemDescription>{orderResult.orderId}</ItemDescription>
                            </ItemContent>
                        </Item>
                        <Item>
                            <ItemContent>
                                <ItemTitle>Tổng giá:</ItemTitle>
                            </ItemContent>
                            <ItemContent>
                                <ItemDescription>{formatCurrency(orderResult.totalAmount)}</ItemDescription>
                            </ItemContent>
                        </Item>
                        <Item>
                            <ItemContent>
                                <ItemTitle>Giảm giá:</ItemTitle>
                            </ItemContent>
                            <ItemContent>
                                <ItemDescription>{formatCurrency(orderResult.discountAmount)}</ItemDescription>
                            </ItemContent>
                        </Item>
                        <Item>
                            <ItemContent>
                                <ItemTitle>Tổng thanh toán:</ItemTitle>
                            </ItemContent>
                            <ItemContent>
                                <ItemDescription>{formatCurrency(orderResult.finalAmount)}</ItemDescription>
                            </ItemContent>
                        </Item>
                        <Item>
                            <ItemContent>
                                <ItemTitle>Thời gian:</ItemTitle>
                            </ItemContent>
                            <ItemContent>
                                <ItemDescription>{orderResult.orderDate}</ItemDescription>
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </CardContent>

                <CardFooter>
                    <ButtonGroup>
                        <Button variant="outline" asChild>
                            <Link to={"/cart"}>Quay lại giỏ hàng</Link>
                        </Button>
                        <Button asChild>
                            <Link to={"/"}>Về trang chủ</Link>
                        </Button>
                    </ButtonGroup>
                </CardFooter>

            </Card>
        </div>
    );
}
