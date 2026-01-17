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
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {formatCurrency} from "@/utils/formattor.ts";
import {getVoucherList} from "@/utils/VoucherUtil.ts";

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
    const vouchers: Voucher[] = getVoucherList();
    const handleApplyVoucher = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const voucherCode = formData.get("voucherCode") as string;
        const voucher = await getVoucherInfo(voucherCode);
        if (voucher) {
            alert(`Áp dụng mã khuyến mãi thành công: ${voucher.code}`);
        } else {
            alert("Mã khuyến mãi không hợp lệ");
        }
    }
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
                        <form className="flex w-full max-w-sm items-center gap-2" onSubmit={handleApplyVoucher}>
                            <Input type="text" placeholder="..." id="voucherCode" name="voucherCode"/>
                            <Button type="submit" variant="outline">
                                Áp dụng
                            </Button>
                        </form>
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
async function getVoucherInfo(voucherCode: string): Promise<Voucher | null> {
    //from api: localhost:3000/voucher/{voucherCode}
    if (!voucherCode) {
        return null;
    }
    const response = await fetch(`http://localhost:3000/voucher/${voucherCode.trim()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const voucher = (await response.json()).voucher as Voucher;
        return voucher;
    }
    return null;
}

export default VoucherItem;