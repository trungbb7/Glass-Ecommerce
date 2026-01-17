import CartItem, { EmptyCartAlert } from "@/components/pages/Cart/CartItem/CartItem.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Header } from "@/components/Header/index.ts";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item.tsx";
import { VoucherDialog } from "@/components/Voucher/Voucher.tsx";
import { formatCurrency } from "@/utils/formattor.ts";
import { useAppDispatch, useAppSelector } from "@/hooks.ts";
import { useEffect, useState } from "react";
import { fetchCart, selectAllItems, deselectAllItems } from "@/components/Cart/cartSlice.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Footer } from "@/components/Footer";
import type { Voucher } from "@/types/voucher.ts";

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { items, selectedItems, loading } = useAppSelector((state) => state.cart);
    const { user, logged } = useAppSelector((state) => state.auth);
    const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

    useEffect(() => {
        if (logged && user?.id) {
            dispatch(fetchCart(String(user.id)));
        }
    }, [dispatch, logged, user?.id]);

    const selectedCartItems = items.filter((item) =>
        selectedItems.includes(`${item.productId}-${item.selectedColor}`)
    );

    const totalItems = selectedCartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = selectedCartItems.reduce(
        (acc, item) => acc + item.product.finalPrice * item.quantity,
        0
    );

    const discountAmount = appliedVoucher && totalPrice >= appliedVoucher.minOrderAmount
        ? appliedVoucher.discountAmount
        : 0;
    const finalPrice = totalPrice - discountAmount;

    const isAllSelected = items.length > 0 && selectedItems.length === items.length;

    const handleSelectAll = () => {
        if (isAllSelected) {
            dispatch(deselectAllItems());
        } else {
            dispatch(selectAllItems());
        }
    };

    const handleCheckout = () => {
        if (selectedCartItems.length === 0) {
            alert("Vui lòng chọn sản phẩm để thanh toán");
            return;
        }
        if (!logged) {
            navigate("/login");
            return;
        }
        // Store selected items and voucher in sessionStorage for checkout
        sessionStorage.setItem("checkoutItems", JSON.stringify(selectedCartItems));
        if (appliedVoucher) {
            sessionStorage.setItem("appliedVoucher", JSON.stringify(appliedVoucher));
        }
        navigate("/checkout");
    };

    const handleVoucherApply = (voucher: Voucher) => {
        if (totalPrice >= voucher.minOrderAmount) {
            setAppliedVoucher(voucher);
        } else {
            alert(`Đơn hàng tối thiểu ${formatCurrency(voucher.minOrderAmount)} để áp dụng mã này`);
        }
    };

    if (!logged) {
        return (
            <div className="">
                <Header />
                <div className="flex h-full flex-col m-8 content-between min-h-[60vh]">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold mb-4">Vui lòng đăng nhập để xem giỏ hàng</h2>
                        <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="">
            <Header />
            <div className="flex h-full flex-col m-8 content-between min-h-[60vh] pb-32">
                <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
                <section className="product-list">
                    <div className="flex items-center space-x-2 m-2">
                        <Checkbox
                            className="w-5 h-5"
                            checked={isAllSelected}
                            onCheckedChange={handleSelectAll}
                        />
                        <Label className="text-lg cursor-pointer" onClick={handleSelectAll}>
                            Chọn tất cả ({items.length} sản phẩm)
                        </Label>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-24 w-full" />
                            ))}
                        </div>
                    ) : items.length === 0 ? (
                        <EmptyCartAlert />
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <CartItem
                                    key={`${item.productId}-${item.selectedColor}`}
                                    item={item}
                                    isSelected={selectedItems.includes(`${item.productId}-${item.selectedColor}`)}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Summary bar */}
                <section className="fixed bottom-0 left-0 w-full z-20 border-t bg-background">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-white shadow-lg rounded-t-lg">
                            <Item className="flex flex-row gap-2 justify-between p-4 flex-wrap">
                                <ItemContent>
                                    <ItemTitle className="text-lg">Đã chọn</ItemTitle>
                                    <ItemDescription className="text-lg font-semibold">
                                        {totalItems} sản phẩm
                                    </ItemDescription>
                                </ItemContent>
                                <ItemContent>
                                    <ItemTitle>Tạm tính</ItemTitle>
                                    <ItemDescription className="text-lg">
                                        {formatCurrency(totalPrice)}
                                    </ItemDescription>
                                </ItemContent>
                                {appliedVoucher && (
                                    <ItemContent>
                                        <ItemTitle>Giảm giá ({appliedVoucher.code})</ItemTitle>
                                        <ItemDescription className="text-lg text-green-600">
                                            -{formatCurrency(discountAmount)}
                                        </ItemDescription>
                                    </ItemContent>
                                )}
                                <ItemContent className="flex flex-row gap-4">
                                    <ItemTitle>Tổng cộng</ItemTitle>
                                    <ItemDescription className="text-xl font-bold text-primary">
                                        {formatCurrency(finalPrice)}
                                    </ItemDescription>
                                </ItemContent>
                                <ItemActions className="flex flex-row gap-2">
                                    <VoucherDialog onApply={handleVoucherApply} />
                                    <Button
                                        className="w-full max-w-48"
                                        size="lg"
                                        onClick={handleCheckout}
                                        disabled={selectedCartItems.length === 0}
                                    >
                                        Thanh toán ({totalItems})
                                    </Button>
                                </ItemActions>
                            </Item>
                        </div>
                    </div>
                </section>
            </div>
            {/*<Footer />*/}
        </div>
    );
}


