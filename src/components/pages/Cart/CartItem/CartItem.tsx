import {AlertCircleIcon, CheckCircle2Icon, MinusIcon, Plus, Trash, X} from "lucide-react";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle
} from "@/components/ui/item.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import type {CartItemType} from "@/components/pages/Cart/Cart.tsx";
import {useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

function CartItem({item}: { item: CartItemType }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }
    const handleDecrease = () => {
        setQuantity(Math.max(1, quantity - 1));
    }
    const totalPrice = (item.price * quantity).toFixed(3);
    return (
        <>
            <Item
                variant="outline"
                className="w-full hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                role="listitem">
                <Checkbox
                    id={item.id}
                    className="w-5 h-5 mt-2"
                ></Checkbox>
                {/*<ItemContent>*/}
                {/*    <ItemTitle>{item.id}</ItemTitle>*/}
                {/*</ItemContent>*/}
                <ItemMedia>
                    <Avatar className="h-14 w-14 rounded-md bg-muted">
                        <AvatarImage src="https://github.com/evilrabbit.png"/>
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>{item.name}</ItemTitle>
                    <ItemDescription>{item.category}</ItemDescription>
                </ItemContent>
                <ItemContent>{totalPrice}</ItemContent>
                <ItemActions className="flex-row gap-4">
                    <ItemGroup className="flex-row gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                            aria-label="Invite"
                            onClick={handleDecrease}
                        >
                            <MinusIcon/>
                        </Button>
                        <input className="max-w-24 text-center" type="number" value={quantity}
                               onChange={handleIncrease}/>
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                            aria-label="Invite"
                            onClick={handleIncrease}
                        >
                            <Plus/>
                        </Button>
                    </ItemGroup>
                    <Button>
                        <Trash/>
                        Xoá
                    </Button>
                </ItemActions>
            </Item>
        </>
    );
}
function EmptyCardAlert() {
    return (
        <>
            <Alert>
                <AlertCircleIcon  />
                <AlertTitle>Bạn chưa thêm sản phẩm nào!</AlertTitle>
                <AlertDescription>
                    Tiếp tục mua sắm để thêm sản phẩm vào giỏ hàng của bạn.
                </AlertDescription>
            </Alert>
        </>
    )
}

export default CartItem;
export {EmptyCardAlert};