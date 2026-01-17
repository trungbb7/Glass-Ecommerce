import { Search, Star, X, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Header } from "@/components/Header/index.ts";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemGroup } from "@/components/ui/item.tsx";
import { formatCurrency } from "@/utils/formattor.ts";
import { ButtonGroup } from "@/components/ui/button-group.tsx";
import OrderStatusBadge from "@/components/Badge/Badge.tsx";
import OrderStatus, { type Order as OrderType, type OrderItem } from "@/types/order.ts";
import { useAppSelector, useAppDispatch } from "@/hooks.ts";
import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { pushNotification } from "@/components/Notification/notificationSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

export function Order() {
    const { logged } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    if (!logged) {
        return (
            <>
                <Header />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Vui lòng đăng nhập để xem đơn hàng</h2>
                        <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <OrderContent />
            <Footer />
        </>
    );
}

const tabContent = [
    { title: "Tất cả", value: "all" },
    { title: "Chờ xử lý", value: OrderStatus.Pending },
    { title: "Đang vận chuyển", value: OrderStatus.Delivering },
    { title: "Đã giao", value: OrderStatus.Delivered },
    { title: "Đã hủy", value: OrderStatus.Cancelled },
];

export function OrderContent() {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    const fetchOrders = async (status?: string) => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const url = status && status !== "all"
                ? `http://localhost:3000/orders/user/${user.id}?status=${status}`
                : `http://localhost:3000/orders/user/${user.id}`;

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(activeTab);
    }, [user?.id, activeTab]);

    const handleCancelOrder = async (orderId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}/cancel`, {
                method: "PATCH",
            });

            if (response.ok) {
                dispatch(pushNotification({
                    type: "success",
                    title: "Thành công",
                    message: "Đã hủy đơn hàng thành công"
                }));
                fetchOrders(activeTab);
            } else {
                const error = await response.json();
                dispatch(pushNotification({
                    type: "error",
                    title: "Lỗi",
                    message: error.error || "Không thể hủy đơn hàng"
                }));
            }
        } catch (error) {
            dispatch(pushNotification({
                type: "error",
                title: "Lỗi",
                message: "Đã có lỗi xảy ra"
            }));
        }
    };

    const filteredOrders = orders.filter((order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderTabTriggers = tabContent.map((tab) => (
        <TabsTrigger
            className="flex-1 whitespace-nowrap"
            key={tab.value}
            value={tab.value}
        >
            {tab.title}
        </TabsTrigger>
    ));

    return (
        <div className="container mx-auto px-4 py-8 min-h-[60vh]">
            <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full flex flex-nowrap overflow-x-auto justify-around mb-4">
                    {renderTabTriggers}
                </TabsList>

                <div className="flex w-full justify-end mb-4 gap-2 items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm đơn hàng..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {tabContent.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-32 w-full" />
                                ))}
                            </div>
                        ) : filteredOrders.length === 0 ? (
                            <EmptyOrders />
                        ) : (
                            <OrderItemList
                                orders={filteredOrders}
                                onCancelOrder={handleCancelOrder}
                            />
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

function EmptyOrders() {
    return (
        <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-muted-foreground mb-4">Bạn chưa có đơn hàng nào trong mục này</p>
            <Button asChild>
                <Link to="/product">Mua sắm ngay</Link>
            </Button>
        </div>
    );
}

interface OrderItemListProps {
    orders: OrderType[];
    onCancelOrder: (orderId: string) => void;
}

function OrderItemList({ orders, onCancelOrder }: OrderItemListProps) {
    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} onCancelOrder={onCancelOrder} />
            ))}
        </div>
    );
}

interface OrderCardProps {
    order: OrderType;
    onCancelOrder: (orderId: string) => void;
}

function OrderCard({ order, onCancelOrder }: OrderCardProps) {
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const handleConfirmCancel = () => {
        onCancelOrder(order.id);
        setShowCancelDialog(false);
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-4">
                        <CardTitle className="text-sm font-mono">#{order.id}</CardTitle>
                        <OrderStatusBadge status={order.status} />
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {new Date(order.orderDate).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <ItemGroup role="list" className="space-y-3 mb-4">
                    {order.items.slice(0, 2).map((item, index) => (
                        <OrderItemRow key={index} item={item} />
                    ))}
                    {order.items.length > 2 && (
                        <p className="text-sm text-muted-foreground">
                            +{order.items.length - 2} sản phẩm khác
                        </p>
                    )}
                </ItemGroup>

                <div className="flex items-center justify-between pt-3 border-t flex-wrap gap-4">
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Tổng thanh toán:</p>
                        <p className="text-lg font-bold text-primary">
                            {formatCurrency(order.finalAmount)}
                        </p>
                    </div>

                    <ButtonGroup>
                        <OrderDetailDialog order={order} />

                        {order.status === OrderStatus.Pending && (
                            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <X className="h-4 w-4 mr-1" />
                                        Hủy đơn
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Xác nhận hủy đơn hàng</DialogTitle>
                                        <DialogDescription>
                                            Bạn có chắc chắn muốn hủy đơn hàng #{order.id}? Hành động này không thể hoàn tác.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Không</Button>
                                        </DialogClose>
                                        <Button variant="destructive" onClick={handleConfirmCancel}>
                                            Xác nhận hủy
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}

                        {order.status === OrderStatus.Delivered && (
                            <Button variant="outline" size="sm">
                                <Star className="h-4 w-4 mr-1" />
                                Đánh giá
                            </Button>
                        )}
                    </ButtonGroup>
                </div>
            </CardContent>
        </Card>
    );
}

function OrderItemRow({ item }: { item: OrderItem }) {
    return (
        <Item className="flex items-center gap-3">
            <ItemMedia>
                <img
                    src={item.imageUrl || "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="h-14 w-14 rounded-md object-cover"
                />
            </ItemMedia>
            <ItemContent className="flex-1">
                <ItemTitle className="line-clamp-1">{item.name}</ItemTitle>
                <ItemDescription className="flex items-center gap-2">
                    {item.selectedColor && (
                        <>
                            Màu: <span
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: item.selectedColor }}
                            />
                        </>
                    )}
                    <span className="ml-2">x{item.quantity}</span>
                </ItemDescription>
            </ItemContent>
            <ItemContent className="text-right">
                <ItemDescription className="font-semibold">
                    {formatCurrency(item.price * item.quantity)}
                </ItemDescription>
            </ItemContent>
        </Item>
    );
}

function OrderDetailDialog({ order }: { order: OrderType }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Chi tiết
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                    <DialogDescription>
                        Mã đơn hàng: <span className="font-mono font-semibold">{order.id}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Status */}
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Trạng thái:</span>
                        <OrderStatusBadge status={order.status} />
                    </div>

                    {/* Shipping Address */}
                    <div>
                        <h4 className="font-semibold mb-2">Thông tin giao hàng</h4>
                        <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                            <p><strong>Người nhận:</strong> {order.shippingAddress.fullName}</p>
                            <p><strong>Số điện thoại:</strong> {order.shippingAddress.phone}</p>
                            <p><strong>Địa chỉ:</strong> {order.shippingAddress.address}</p>
                        </div>
                    </div>

                    {/* Items */}
                    <div>
                        <h4 className="font-semibold mb-2">Sản phẩm ({order.items.length})</h4>
                        <ItemGroup role="list" className="space-y-3">
                            {order.items.map((item, index) => (
                                <OrderItemRow key={index} item={item} />
                            ))}
                        </ItemGroup>
                    </div>

                    {/* Payment Info */}
                    <div>
                        <h4 className="font-semibold mb-2">Thông tin thanh toán</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Phương thức thanh toán:</span>
                                <span>
                                    {order.paymentMethod === "COD"
                                        ? "Thanh toán khi nhận hàng"
                                        : order.paymentMethod === "BANKING"
                                            ? "Chuyển khoản ngân hàng"
                                            : "Ví MoMo"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tạm tính:</span>
                                <span>{formatCurrency(order.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phí vận chuyển:</span>
                                <span>{formatCurrency(order.shippingFee)}</span>
                            </div>
                            {order.discountAmount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Giảm giá {order.voucherCode && `(${order.voucherCode})`}:</span>
                                    <span>-{formatCurrency(order.discountAmount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Tổng cộng:</span>
                                <span className="text-primary">{formatCurrency(order.finalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div>
                        <h4 className="font-semibold mb-2">Thời gian</h4>
                        <div className="text-sm space-y-1">
                            <p>
                                <strong>Đặt hàng:</strong>{" "}
                                {new Date(order.orderDate).toLocaleString("vi-VN")}
                            </p>
                            {order.updatedAt && (
                                <p>
                                    <strong>Cập nhật:</strong>{" "}
                                    {new Date(order.updatedAt).toLocaleString("vi-VN")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Đóng</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
