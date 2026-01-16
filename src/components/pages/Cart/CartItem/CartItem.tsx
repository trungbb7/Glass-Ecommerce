import {MinusIcon, Plus, Trash, X} from "lucide-react";
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
            <Item variant="outline" className="w-full max-w-8/10" role="listitem">
                <ItemContent>
                    <ItemTitle>{item.id}</ItemTitle>
                </ItemContent>
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

export default CartItem;