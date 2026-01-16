import {Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle} from "@/components/ui/item.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Ticket} from "lucide-react";
import {useNavigate} from "react-router-dom";

function OrderSummary(props) {
    //use shadcn components
    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <ItemGroup className="row-gap-4" role="list">

                <Item key="discount" variant="outline" role="listitem">
                    <ItemContent>
                        <ItemTitle className="line-clamp-1">
                            Discount
                            <span className="text-muted-foreground"></span>
                        </ItemTitle>
                        <ItemDescription></ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex-none text-center">
                        <ItemDescription>100.000</ItemDescription>
                    </ItemContent>
                </Item>
                <Item key="total-price" variant="outline" role="listitem">
                    <ItemContent>
                        <ItemTitle className="line-clamp-1">
                            Total Price
                            <span className="text-muted-foreground"></span>
                        </ItemTitle>
                        <ItemDescription></ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex-none text-center">
                        <ItemDescription>200.000</ItemDescription>
                    </ItemContent>
                </Item>
                <Item key="final-price" variant="outline" role="listitem">
                    <ItemContent>
                        <ItemTitle className="line-clamp-1">
                            Final Price
                            <span className="text-muted-foreground"></span>
                        </ItemTitle>
                        <ItemDescription></ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex-none text-center">
                        <ItemDescription>200.000</ItemDescription>
                    </ItemContent>
                </Item>
            </ItemGroup>
        </div>
    );
}
function OrderSummarySimple({chosenItems}: { chosenItems: number }) {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <Item className='flex flex-row gap-2 justify-between'>
                    <ItemContent>
                        <ItemTitle>Đã chọn</ItemTitle>
                        <ItemDescription>{chosenItems}</ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex flex-row gap-4">
                        <ItemTitle>Tổng cộng</ItemTitle>
                        <ItemDescription className="text-lg">{3}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <Button
                            className="max-w-48"
                        variant="outline">
                            <Ticket />
                            Nhập mã khuyến mãi</Button>
                        <Button
                            className="w-full max-w-48"
                            size="lg"
                            onClick={()=> navigate("/checkout")}>Mua hàng</Button>
                    </ItemActions>
                </Item>
            </div>
            <div></div>
        </>
    );
}

export default OrderSummary;
export {OrderSummarySimple}