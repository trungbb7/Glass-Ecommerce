import { AlertCircleIcon, MinusIcon, Plus, Trash } from "lucide-react";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle
} from "@/components/ui/item.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks.ts";
import { toggleSelectItem, updateCartItemQuantity, removeFromCart } from "@/components/Cart/cartSlice.ts";
import type { CartItemWithProduct } from "@/types/cart.ts";
import { formatCurrency } from "@/utils/formattor.ts";
import { Link } from "react-router-dom";

interface CartItemProps {
    item: CartItemWithProduct;
    isSelected: boolean;
}

function CartItem({ item, isSelected }: CartItemProps) {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const handleIncrease = () => {
        if (user?.id) {
            dispatch(updateCartItemQuantity({
                userId: String(user.id),
                productId: item.productId,
                selectedColor: item.selectedColor,
                quantity: item.quantity + 1
            }));
        }
    };

    const handleDecrease = () => {
        if (user?.id && item.quantity > 1) {
            dispatch(updateCartItemQuantity({
                userId: String(user.id),
                productId: item.productId,
                selectedColor: item.selectedColor,
                quantity: item.quantity - 1
            }));
        }
    };

    const handleRemove = () => {
        if (user?.id) {
            dispatch(removeFromCart({
                userId: String(user.id),
                productId: item.productId,
                selectedColor: item.selectedColor
            }));
        }
    };

    const handleToggleSelect = () => {
        dispatch(toggleSelectItem({
            productId: item.productId,
            selectedColor: item.selectedColor
        }));
    };

    const totalPrice = item.product.finalPrice * item.quantity;

    return (
        <Item
            variant="outline"
            className={`w-full hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                isSelected ? 'border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950' : ''
            }`}
            role="listitem"
        >
            <Checkbox
                id={`${item.productId}-${item.selectedColor}`}
                className="w-5 h-5"
                checked={isSelected}
                onCheckedChange={handleToggleSelect}
            />
            <ItemMedia>
                <Link to={`/product/${item.productId}`}>
                    <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-md object-cover bg-muted"
                    />
                </Link>
            </ItemMedia>
            <ItemContent className="flex-1 min-w-0">
                <Link to={`/product/${item.productId}`}>
                    <ItemTitle className="line-clamp-2 hover:text-primary">
                        {item.product.name}
                    </ItemTitle>
                </Link>
                <ItemDescription className="flex items-center gap-2 mt-1">
                    <span>Màu:</span>
                    <span
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.selectedColor }}
                    />
                </ItemDescription>
                <ItemDescription className="mt-1">
                    <span className="text-primary font-semibold">
                        {formatCurrency(item.product.finalPrice)}
                    </span>
                    {item.product.stockPrice !== item.product.finalPrice && (
                        <span className="text-muted-foreground line-through ml-2 text-sm">
                            {formatCurrency(item.product.stockPrice)}
                        </span>
                    )}
                </ItemDescription>
            </ItemContent>
            <ItemContent className="text-right">
                <ItemTitle className="text-lg font-bold text-primary">
                    {formatCurrency(totalPrice)}
                </ItemTitle>
            </ItemContent>
            <ItemActions className="flex-row gap-4">
                <ItemGroup className="flex-row gap-2 items-center">
                    <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full h-8 w-8"
                        onClick={handleDecrease}
                        disabled={item.quantity <= 1}
                    >
                        <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full h-8 w-8"
                        onClick={handleIncrease}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </ItemGroup>
                <Button variant="destructive" size="sm" onClick={handleRemove}>
                    <Trash className="h-4 w-4 mr-1" />
                    Xoá
                </Button>
            </ItemActions>
        </Item>
    );
}

function EmptyCartAlert() {
    return (
        <Alert className="my-8">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Giỏ hàng trống!</AlertTitle>
            <AlertDescription>
                Bạn chưa thêm sản phẩm nào vào giỏ hàng.{" "}
                <Link to="/product" className="text-primary underline">
                    Tiếp tục mua sắm
                </Link>
            </AlertDescription>
        </Alert>
    );
}

export default CartItem;
export { EmptyCartAlert };
