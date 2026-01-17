import {Search, Star} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs.tsx";
import {Header} from "@/components/Header/index.ts";
import {Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle} from "@/components/ui/item.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {formatCurrency} from "@/utils/formattor.ts";
import {ButtonGroup} from "@/components/ui/button-group.tsx";
import OrderStatusBadge from "@/components/Badge/Badge.tsx";
import OrderStatus from "@/types/order.ts";

export function Order() {
    return (
        <>
            <Header></Header>
            <OrderContent></OrderContent>
        </>
    )
}
type TabContent = {
    title: string;
    value: string;
}
type OrderItemType = {
    id: number;
    name: string;
    description?: string;
    quantity: number;
    price: number;
    status: string;
    statusValue?: string;
}
const sampleOrderItems: OrderItemType[] = [
    {
        id: 1,
        name: "Sản phẩm 1",
        quantity: 2,
        price: 100000,
        status: "Đang xử lý",
        statusValue: 'PENDING'
    },
    {
        id: 2,
        name: "Sản phẩm 2",
        quantity: 1,
        price: 200000,
        status: "Đang vận chuyển",
        statusValue: 'DELIVERING'
    },
    {
        id: 3,
        name: "Sản phẩm 3",
        quantity: 3,
        price: 150000,
        status: "Đã giao",
        statusValue: 'DELIVERED'
    },
];


export function OrderContent() {
    const tabContent = [
        { title: "Tất cả", value: "all" },
        { title: "Chờ thanh toán", value: "wait-pay" },
        { title: "Đang xử lý", value: "processing" },
        { title: "Đang vận chuyển", value: "delivering" },
        { title: "Đã giao", value: "delivered" },
        { title: "Đã hủy", value: "canceled" },
    ];
    const renderTabTriggers = tabContent.map((tab) => (
        <TabsTrigger
            className="flex-1 whitespace-nowrap"
            key={tab.value}
            value={tab.value}>
            {tab.title}
        </TabsTrigger>
    ));
    return (
        <div className="flex w-full max-w-8/10 flex-col gap-6 layout-padding my-8 mx-auto">
            <Tabs defaultValue="all">
                <TabsList className="w-full flex flex-nowrap overflow-x-auto justify-around">
                    {renderTabTriggers}
                </TabsList>
                <div className="flex w-full justify-end mb-4 gap-2 items-center mt-4">
                    <Input
                        type="text"
                        placeholder="Tìm kiếm đơn hàng..."
                        className="max-w-sm"
                    />
                    <Search />
                </div>

                <TabsContent value="all">
                    <OrderItemList items={sampleOrderItems} statusType={"all"}></OrderItemList>
                </TabsContent>
                <TabsContent value={OrderStatus.Pending}>
                    <OrderItemList items={sampleOrderItems} statusType={OrderStatus.Pending}></OrderItemList>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function OrderItemList({items, statusType}: {items: OrderItemType[]; statusType: string}) {
    const filteredItems = (items as OrderItemType[]).filter((item) => {
        return statusType === "all" || item.statusValue === statusType;
    });
    const renderedItems = (filteredItems as OrderItemType[]).map((item: OrderItemType) => (
        <OrderItem key={item.id} item={item}></OrderItem>
    ));
    return (
        <div>{renderedItems}</div>
    )
}
function OrderItem({item}: {item: OrderItemType}) {
    return (
        <Item
            variant="outline"
            className="w-full hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 justify-around"
            role="listitem">
            <ItemMedia>
                <Avatar className="h-14 w-14 rounded-md bg-muted">
                    <AvatarImage src="https://github.com/evilrabbit.png"/>
                    <AvatarFallback>ER</AvatarFallback>
                </Avatar>
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
                <ItemDescription>x{item.quantity}</ItemDescription>
                <ItemDescription>{formatCurrency(item.price)}</ItemDescription>
            </ItemContent>
            <ItemContent>
                {/*<ItemTitle>{item.status}</ItemTitle>*/}
                <OrderStatusBadge status={item.status}></OrderStatusBadge>
            </ItemContent>

            <ItemActions className="flex-row gap-4">
                <ButtonGroup>
                    <Button variant="outline">
                        <Star />
                        Đánh giá
                    </Button>
                    <Button variant="default">Xem chi tiết</Button>
                </ButtonGroup>
            </ItemActions>
        </Item>
    );

}
