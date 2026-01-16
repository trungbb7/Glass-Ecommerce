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
import {Item, ItemContent, ItemDescription, ItemGroup, ItemTitle} from "@/components/ui/item.tsx";
import {Checkbox} from "@radix-ui/react-checkbox";

type Props = {
    vouchers?: Array<any>;
};
type Voucher = {
    code: string;
    description: string;
    discountAmount: number;
    minOrderAmount: number;
    expiryDate: string;
};

export function VoucherDialog() {
    //get vouchers
    const vouchers: Voucher[] = [
        {
            code: "DISCOUNT10",
            description: "Giảm giá 10%",
            discountAmount: 10,
            minOrderAmount: 100000,
            expiryDate: "2024-12-31",
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
        }
    ];
    const renderVouchers = () => {
        if (vouchers && vouchers.length > 0) {
            return vouchers.map((voucher, index) => (
                <VoucherItem key={index} voucher={voucher}/>
            ));
        } else {
            return <div>Không có mã khuyến mãi nào</div>;
        }
    }
    return (
            <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        className="max-w-48"
                        variant="outline">
                        <Ticket/>
                        Nhập mã khuyến mãi</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]  max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Mã khuyến mãi</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                        <div className="flex w-full max-w-sm items-center gap-2">
                            <Input type="text" placeholder="..." />
                            <Button type="submit" variant="outline">
                                Áp dụng
                            </Button>
                        </div>
                    </DialogHeader>
                    <div className="grid gap-4 overflow-y-auto max-h-[60vh]">
                        <ItemGroup className="row-gap-4" role="list">
                            {renderVouchers()}
                        </ItemGroup>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Huỷ</Button>
                        </DialogClose>
                        <Button type="submit">Áp dụng</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

function VoucherItem({voucher}: { voucher?: Voucher }) {
    return (
        <Item>
            <ItemContent>
                <ItemTitle>{voucher?.code}</ItemTitle>
                <ItemDescription>{voucher?.description}</ItemDescription>
            </ItemContent>
            <ItemContent className="flex-none text-center">
                <ItemDescription>Áp dụng</ItemDescription>
            </ItemContent>
        </Item>
    );
}

export default VoucherItem;