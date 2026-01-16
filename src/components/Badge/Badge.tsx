import { Badge as BadgeShadcn} from "@/components/ui/badge"
import {Check} from "lucide-react";
const OrderStatus = {
    Pending: 'Pending',
    Shipped: 'Shipped',
    Delivered: 'Delivered',
    Cancelled: 'Cancelled',
    Done: 'Đã giao',
}
interface BadgeProps {
    status: string;
}
export default function OrderStatusBadge({status}: BadgeProps) {
    switch (status) {
        case OrderStatus.Pending:
            return <BadgeShadcn variant="default">{status}</BadgeShadcn>;
        case OrderStatus.Shipped:
            return <BadgeShadcn variant="outline">{status}</BadgeShadcn>;
        case OrderStatus.Delivered:
            return <BadgeShadcn variant="secondary">{status}</BadgeShadcn>;
        case OrderStatus.Cancelled:
            return <BadgeShadcn
                variant="destructive"
                className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
            >{status}</BadgeShadcn>;
        case OrderStatus.Done:
            return <BadgeShadcn
                variant="default"
                className="bg-green-100 text-green-700 flex items-center gap-1"
            >
                <Check />
                {status}</BadgeShadcn>;
        default:
            return <BadgeShadcn variant="default">{status}</BadgeShadcn>;
    }
}