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
import { Checkbox } from "@/components/ui/checkbox"
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {formatCurrency} from "@/utils/formattor.ts";

type Props = {
    vouchers?: Array<any>;
};
type Voucher = {
    code: string;
    description: string;
    discountAmount: number;
    minOrderAmount: number;
    expiryDate: string;
    quantity?: number;
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
            quantity: 1,
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
            quantity: 2,
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
            quantity: 2,
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
            quantity: 2,
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
            quantity: 2,
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
            quantity: 2,
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
            quantity: 2,
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
            quantity: 2,
        },
        {
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discountAmount: 0,
            minOrderAmount: 50000,
            expiryDate: "2024-11-30",
            quantity: 2,
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
                <DialogContent className="sm:max-w-7/10  max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Mã khuyến mãi</DialogTitle>
                        <DialogDescription>
                            Nhập mã khuyến mãi của bạn bên dưới hoặc chọn từ các mã có sẵn:
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
            <ItemMedia>
                <Avatar className="h-14 w-14 rounded-md bg-muted">
                    <AvatarImage src="https://github.com/evilrabbit.png"/>
                    <AvatarFallback>ER</AvatarFallback>
                </Avatar>
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{voucher?.code}</ItemTitle>
                <ItemDescription>{voucher?.description}</ItemDescription>
            </ItemContent>
            <ItemContent>
                <ItemTitle> {voucher?.quantity?? 0 > 0? `x${voucher?.quantity}`: ".."}</ItemTitle>
                <ItemDescription>x {voucher?.expiryDate}</ItemDescription>
            </ItemContent>
            <ItemActions className="flex-none text-center">
                {/*<Checkbox></Checkbox>*/}
                <VoucherDetail voucher={voucher}></VoucherDetail>
            </ItemActions>
        </Item>
    );
}
function VoucherDetail({voucher}: { voucher?: Voucher }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Xem chi tiết</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4/10">
                <DialogHeader>
                    <DialogTitle>Chi tiết mã khuyến mãi</DialogTitle>
                    <DialogDescription>
                        Mã khuyến mãi: {voucher?.code}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div>
                        <Label>Miêu tả:</Label>
                        <p>{voucher?.description}</p>
                    </div>
                    <div>
                        <Label>Số tiền giảm giá:</Label>
                        <p>{formatCurrency(voucher?.discountAmount ??0)}</p>
                    </div>
                    <div>
                        <Label>Đơn hàng tối thiểu:</Label>
                        <p>{formatCurrency(voucher?.minOrderAmount ?? 0)}</p>
                    </div>
                    <div>
                        <Label>Hạn sử dụng:</Label>
                        <p>{voucher?.expiryDate}</p>
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

export default VoucherItem;