import { Badge as BadgeShadcn } from "@/components/ui/badge";
import { Check, Clock, Truck, Package, X } from "lucide-react";

interface BadgeProps {
    status: string;
}

export default function OrderStatusBadge({ status }: BadgeProps) {
    switch (status) {
        case "PENDING":
            return (
                <BadgeShadcn
                    variant="outline"
                    className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 flex items-center gap-1"
                >
                    <Clock className="h-3 w-3" />
                    Chờ xử lý
                </BadgeShadcn>
            );
        case "SHIPPED":
            return (
                <BadgeShadcn
                    variant="outline"
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center gap-1"
                >
                    <Package className="h-3 w-3" />
                    Đã gửi
                </BadgeShadcn>
            );
        case "DELIVERING":
            return (
                <BadgeShadcn
                    variant="outline"
                    className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 flex items-center gap-1"
                >
                    <Truck className="h-3 w-3" />
                    Đang giao
                </BadgeShadcn>
            );
        case "DELIVERED":
            return (
                <BadgeShadcn
                    variant="default"
                    className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 flex items-center gap-1"
                >
                    <Check className="h-3 w-3" />
                    Đã giao
                </BadgeShadcn>
            );
        case "CANCELLED":
            return (
                <BadgeShadcn
                    variant="destructive"
                    className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 flex items-center gap-1"
                >
                    <X className="h-3 w-3" />
                    Đã hủy
                </BadgeShadcn>
            );
        case "DONE":
            return (
                <BadgeShadcn
                    variant="default"
                    className="bg-green-100 text-green-700 flex items-center gap-1"
                >
                    <Check className="h-3 w-3" />
                    Hoàn thành
                </BadgeShadcn>
            );
        default:
            return <BadgeShadcn variant="secondary">{status}</BadgeShadcn>;
    }
}