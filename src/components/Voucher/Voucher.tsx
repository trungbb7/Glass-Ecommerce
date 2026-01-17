// @flow
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Ticket} from "lucide-react";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle
} from "@/components/ui/item.tsx";
import {formatCurrency} from "@/utils/formattor.ts";
import { useState, useEffect } from "react";
import type { Voucher } from "@/types/voucher";

interface VoucherDialogProps {
    onApply?: (voucher: Voucher) => void;
}

export function VoucherDialog({ onApply }: VoucherDialogProps) {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [open, setOpen] = useState(false);
    const [voucherCode, setVoucherCode] = useState("");

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await fetch("http://localhost:3000/vouchers");
                if (response.ok) {
                    const data = await response.json();
                    setVouchers(data);
                }
            } catch (error) {
                console.error("Failed to fetch vouchers:", error);
            }
        };
        if (open) {
            fetchVouchers();
        }
    }, [open]);

    const handleApplyVoucher = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const voucher = await getVoucherInfo(voucherCode);
        if (voucher && onApply) {
            onApply(voucher);
            setOpen(false);
            setVoucherCode("");
        } else if (!voucher) {
            alert("Mã khuyến mãi không hợp lệ");
        }
    };

    const handleSelectVoucher = (voucher: Voucher) => {
        if (onApply) {
            onApply(voucher);
            setOpen(false);
        }
    };

    const renderVouchers = () => {
        if (vouchers && vouchers.length > 0) {
            return vouchers.map((voucher, index) => (
                <VoucherItem key={index} voucher={voucher} onSelect={handleSelectVoucher} />
            ));
        } else {
            return <div className="text-center py-4 text-muted-foreground">Không có mã khuyến mãi nào</div>;
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="max-w-48"
                    variant="outline">
                    <Ticket />
                    Mã khuyến mãi
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Mã khuyến mãi</DialogTitle>
                    <DialogDescription>
                        Nhập mã khuyến mãi của bạn bên dưới hoặc chọn từ các mã có sẵn:
                    </DialogDescription>
                </DialogHeader>
                <form className="flex w-full items-center gap-2" onSubmit={handleApplyVoucher}>
                    <Input
                        type="text"
                        placeholder="Nhập mã giảm giá..."
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                    />
                    <Button type="submit" variant="default">
                        Áp dụng
                    </Button>
                </form>
                <div className="grid gap-4 overflow-y-auto max-h-[50vh]">
                    <ItemGroup className="row-gap-4" role="list">
                        {renderVouchers()}
                    </ItemGroup>
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

interface VoucherItemProps {
    voucher: Voucher;
    onSelect?: (voucher: Voucher) => void;
}

function VoucherItem({ voucher, onSelect }: VoucherItemProps) {
    return (
        <Item className="border rounded-lg p-3">
            <ItemMedia>
                <div className="h-14 w-14 rounded-md bg-primary/10 flex items-center justify-center">
                    <Ticket className="h-8 w-8 text-primary" />
                </div>
            </ItemMedia>
            <ItemContent className="flex-1">
                <ItemTitle className="font-bold text-primary">{voucher.code}</ItemTitle>
                <ItemDescription>{voucher.description}</ItemDescription>
                <ItemDescription className="text-sm">
                    Giảm: <span className="font-semibold text-green-600">{formatCurrency(voucher.discountAmount)}</span>
                    {" | "}
                    Đơn tối thiểu: {formatCurrency(voucher.minOrderAmount)}
                </ItemDescription>
            </ItemContent>
            <ItemContent className="text-right">
                <ItemDescription className="text-xs text-muted-foreground">
                    HSD: {voucher.expiryDate}
                </ItemDescription>
                <ItemDescription className="text-xs">
                    Còn lại: {voucher.quantity ?? 0}
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                {onSelect ? (
                    <Button variant="outline" size="sm" onClick={() => onSelect(voucher)}>
                        Áp dụng
                    </Button>
                ) : (
                    <VoucherDetail voucher={voucher} />
                )}
            </ItemActions>
        </Item>
    );
}

function VoucherDetail({ voucher }: { voucher?: Voucher }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Xem chi tiết</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Chi tiết mã khuyến mãi</DialogTitle>
                    <DialogDescription>
                        Mã: <span className="font-bold">{voucher?.code}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div>
                        <Label>Miêu tả:</Label>
                        <p className="text-muted-foreground">{voucher?.description}</p>
                    </div>
                    <div>
                        <Label>Số tiền giảm giá:</Label>
                        <p className="text-green-600 font-semibold">{formatCurrency(voucher?.discountAmount ?? 0)}</p>
                    </div>
                    <div>
                        <Label>Đơn hàng tối thiểu:</Label>
                        <p>{formatCurrency(voucher?.minOrderAmount ?? 0)}</p>
                    </div>
                    <div>
                        <Label>Hạn sử dụng:</Label>
                        <p>{voucher?.expiryDate}</p>
                    </div>
                    <div>
                        <Label>Số lượng còn lại:</Label>
                        <p>{voucher?.quantity ?? 0}</p>
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

async function getVoucherInfo(voucherCode: string): Promise<Voucher | null> {
    if (!voucherCode) {
        return null;
    }
    try {
        const response = await fetch(`http://localhost:3000/vouchers?code=${voucherCode.trim()}`);
        if (response.ok) {
            const vouchers = await response.json();
            if (vouchers.length > 0) {
                return vouchers[0] as Voucher;
            }
        }
    } catch (error) {
        console.error("Failed to fetch voucher:", error);
    }
    return null;
}

export default VoucherItem;