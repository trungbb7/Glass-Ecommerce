import { Header } from "@/components/Header/index.ts";
import type { OrderResult } from "@/types/order.ts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CircleAlert, CircleCheck, CreditCard, Truck, Wallet } from "lucide-react";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item.tsx";
import { formatCurrency } from "@/utils/formattor.ts";
import { ButtonGroup } from "@/components/ui/button-group.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks.ts";
import { useState, useEffect } from "react";
import type { CartItemWithProduct } from "@/types/cart.ts";
import type { Voucher } from "@/types/voucher.ts";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Footer } from "@/components/Footer";
import { clearCart } from "@/components/Cart/cartSlice.ts";
import { pushNotification } from "@/components/Notification/notificationSlice.ts";

type PaymentMethod = "COD" | "BANKING" | "MOMO";

interface ShippingInfo {
    fullName: string;
    phone: string;
    address: string;
}

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, logged } = useAppSelector((state) => state.auth);
    const [checkoutItems, setCheckoutItems] = useState<CartItemWithProduct[]>([]);
    const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
    const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        fullName: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        // Get checkout items from sessionStorage
        const storedItems = sessionStorage.getItem("checkoutItems");
        const storedVoucher = sessionStorage.getItem("appliedVoucher");

        if (storedItems) {
            setCheckoutItems(JSON.parse(storedItems));
        } else {
            navigate("/cart");
            return;
        }

        if (storedVoucher) {
            setAppliedVoucher(JSON.parse(storedVoucher));
        }

        // Pre-fill shipping info from user data
        if (user) {
            setShippingInfo({
                fullName: user.fullName || "",
                phone: user.tel || "",
                address: user.address || "",
            });
        }
    }, [navigate, user]);

    const totalAmount = checkoutItems.reduce(
        (acc, item) => acc + item.product.finalPrice * item.quantity,
        0
    );
    const shippingFee = 30000;
    const discountAmount = appliedVoucher && totalAmount >= appliedVoucher.minOrderAmount
        ? appliedVoucher.discountAmount
        : 0;
    const finalAmount = totalAmount - discountAmount + shippingFee;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitOrder = async () => {
        if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
            dispatch(pushNotification({
                type: "error",
                title: "Lỗi",
                message: "Vui lòng điền đầy đủ thông tin giao hàng"
            }));
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user?.id,
                    items: checkoutItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        selectedColor: item.selectedColor,
                    })),
                    shippingAddress: shippingInfo,
                    paymentMethod,
                    voucherCode: appliedVoucher?.code || null,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setOrderResult({
                    orderId: data.order.id,
                    isSuccessful: true,
                    items: data.order.items,
                    totalAmount: data.order.totalAmount,
                    discountAmount: data.order.discountAmount,
                    finalAmount: data.order.finalAmount,
                    orderDate: data.order.orderDate,
                });

                // Clear cart in Redux
                if (user?.id) {
                    dispatch(clearCart(String(user.id)));
                }

                // Clear sessionStorage
                sessionStorage.removeItem("checkoutItems");
                sessionStorage.removeItem("appliedVoucher");

                dispatch(pushNotification({
                    type: "success",
                    title: "Thành công",
                    message: "Đặt hàng thành công!"
                }));
            } else {
                const error = await response.json();
                setOrderResult({
                    orderId: "",
                    isSuccessful: false,
                    items: [],
                    totalAmount: 0,
                    discountAmount: 0,
                    finalAmount: 0,
                    orderDate: new Date().toISOString(),
                });
                dispatch(pushNotification({
                    type: "error",
                    title: "Lỗi",
                    message: error.error || "Đặt hàng thất bại"
                }));
            }
        } catch (error) {
            console.error("Order error:", error);
            setOrderResult({
                orderId: "",
                isSuccessful: false,
                items: [],
                totalAmount: 0,
                discountAmount: 0,
                finalAmount: 0,
                orderDate: new Date().toISOString(),
            });
        } finally {
            setLoading(false);
        }
    };

    if (!logged) {
        return (
            <>
                <Header />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Vui lòng đăng nhập</CardTitle>
                            <CardDescription>Bạn cần đăng nhập để tiến hành thanh toán</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button onClick={() => navigate("/login")} className="w-full">
                                Đăng nhập
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <Footer />
            </>
        );
    }

    // Show order result
    if (orderResult) {
        return (
            <>
                <Header />
                <CheckoutResult orderResult={orderResult} />
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8 min-h-[60vh]">
                <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left column - Shipping & Payment */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Truck className="h-5 w-5" />
                                    Thông tin giao hàng
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="fullName">Họ và tên *</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        value={shippingInfo.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Nhập họ và tên"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Số điện thoại *</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                        placeholder="Nhập địa chỉ chi tiết"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wallet className="h-5 w-5" />
                                    Phương thức thanh toán
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <label
                                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                                            paymentMethod === "COD" ? "border-primary bg-primary/5" : "hover:bg-muted"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="COD"
                                            checked={paymentMethod === "COD"}
                                            onChange={() => setPaymentMethod("COD")}
                                            className="w-4 h-4"
                                        />
                                        <Truck className="h-5 w-5" />
                                        <div>
                                            <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                                            <p className="text-sm text-muted-foreground">
                                                Thanh toán bằng tiền mặt khi nhận hàng
                                            </p>
                                        </div>
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                                            paymentMethod === "BANKING" ? "border-primary bg-primary/5" : "hover:bg-muted"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="BANKING"
                                            checked={paymentMethod === "BANKING"}
                                            onChange={() => setPaymentMethod("BANKING")}
                                            className="w-4 h-4"
                                        />
                                        <CreditCard className="h-5 w-5" />
                                        <div>
                                            <p className="font-medium">Chuyển khoản ngân hàng</p>
                                            <p className="text-sm text-muted-foreground">
                                                Chuyển khoản qua tài khoản ngân hàng
                                            </p>
                                        </div>
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                                            paymentMethod === "MOMO" ? "border-primary bg-primary/5" : "hover:bg-muted"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="MOMO"
                                            checked={paymentMethod === "MOMO"}
                                            onChange={() => setPaymentMethod("MOMO")}
                                            className="w-4 h-4"
                                        />
                                        <Wallet className="h-5 w-5 text-pink-500" />
                                        <div>
                                            <p className="font-medium">Ví MoMo</p>
                                            <p className="text-sm text-muted-foreground">
                                                Thanh toán qua ví điện tử MoMo
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Sản phẩm đặt mua ({checkoutItems.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ItemGroup role="list" className="space-y-3">
                                    {checkoutItems.map((item) => (
                                        <Item key={`${item.productId}-${item.selectedColor}`} className="border rounded-lg p-3">
                                            <ItemMedia>
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="h-16 w-16 rounded-md object-cover"
                                                />
                                            </ItemMedia>
                                            <ItemContent className="flex-1">
                                                <ItemTitle className="line-clamp-2">{item.product.name}</ItemTitle>
                                                <ItemDescription className="flex items-center gap-2">
                                                    Màu: <span
                                                        className="w-3 h-3 rounded-full border"
                                                        style={{ backgroundColor: item.selectedColor }}
                                                    />
                                                </ItemDescription>
                                                <ItemDescription>x{item.quantity}</ItemDescription>
                                            </ItemContent>
                                            <ItemContent className="text-right">
                                                <ItemTitle className="text-primary font-semibold">
                                                    {formatCurrency(item.product.finalPrice * item.quantity)}
                                                </ItemTitle>
                                            </ItemContent>
                                        </Item>
                                    ))}
                                </ItemGroup>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column - Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Tổng đơn hàng</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Tạm tính</span>
                                    <span>{formatCurrency(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển</span>
                                    <span>{formatCurrency(shippingFee)}</span>
                                </div>
                                {appliedVoucher && discountAmount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Giảm giá ({appliedVoucher.code})</span>
                                        <span>-{formatCurrency(discountAmount)}</span>
                                    </div>
                                )}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Tổng cộng</span>
                                        <span className="text-primary">{formatCurrency(finalAmount)}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-3">
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={handleSubmitOrder}
                                    disabled={loading || checkoutItems.length === 0}
                                >
                                    {loading ? "Đang xử lý..." : "Đặt hàng"}
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link to="/cart">Quay lại giỏ hàng</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

function CheckoutResult({ orderResult }: { orderResult: OrderResult }) {
    const isSuccessful = orderResult.isSuccessful;

    return (
        <div className="container mx-auto px-4 py-8 min-h-[60vh]">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="items-center space-y-4">
                    {isSuccessful ? (
                        <CircleCheck className="h-16 w-16 text-green-500" />
                    ) : (
                        <CircleAlert className="h-16 w-16 text-red-500" />
                    )}
                    <CardTitle className="text-xl">
                        {isSuccessful ? "Đặt hàng thành công!" : "Đặt hàng thất bại"}
                    </CardTitle>
                    <CardDescription>
                        {isSuccessful
                            ? "Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý."
                            : "Đã có lỗi xảy ra. Vui lòng thử lại."}
                    </CardDescription>
                </CardHeader>
                {isSuccessful && (
                    <CardContent>
                        <ItemGroup className="space-y-3" role="list">
                            <Item className="flex justify-between">
                                <ItemContent>
                                    <ItemTitle>Mã đơn hàng</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                    <ItemDescription className="font-mono font-semibold">
                                        {orderResult.orderId}
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                            <Item className="flex justify-between">
                                <ItemContent>
                                    <ItemTitle>Tổng tiền hàng</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                    <ItemDescription>{formatCurrency(orderResult.totalAmount)}</ItemDescription>
                                </ItemContent>
                            </Item>
                            {orderResult.discountAmount > 0 && (
                                <Item className="flex justify-between">
                                    <ItemContent>
                                        <ItemTitle>Giảm giá</ItemTitle>
                                    </ItemContent>
                                    <ItemContent>
                                        <ItemDescription className="text-green-600">
                                            -{formatCurrency(orderResult.discountAmount)}
                                        </ItemDescription>
                                    </ItemContent>
                                </Item>
                            )}
                            <Item className="flex justify-between border-t pt-3">
                                <ItemContent>
                                    <ItemTitle className="font-bold">Tổng thanh toán</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                    <ItemDescription className="text-lg font-bold text-primary">
                                        {formatCurrency(orderResult.finalAmount)}
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                            <Item className="flex justify-between">
                                <ItemContent>
                                    <ItemTitle>Thời gian đặt hàng</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                    <ItemDescription>
                                        {new Date(orderResult.orderDate).toLocaleString("vi-VN")}
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                        </ItemGroup>
                    </CardContent>
                )}
                <CardFooter className="flex justify-center gap-4">
                    <ButtonGroup>
                        <Button variant="outline" asChild>
                            <Link to="/orders">Xem đơn hàng</Link>
                        </Button>
                        <Button asChild>
                            <Link to="/">Tiếp tục mua sắm</Link>
                        </Button>
                    </ButtonGroup>
                </CardFooter>

            </Card>
        </div>
    );
}
