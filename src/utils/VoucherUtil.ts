//check vouchercode
import type {Voucher} from "@/types/voucher.ts";

async function getVoucherDetails(voucherCode: string): Promise<Voucher|null> {
    //fetch api
    //sample data - replace with fetch api when refactor
    const sampleVouchers: Voucher[] = getVoucherList();

    const voucher = sampleVouchers.find(v => v.code === voucherCode);
    if (voucher) {
        return voucher;
    } else {
        return null;
    }
}
function getVoucherList(){
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
    return vouchers;
}
export {getVoucherDetails, getVoucherList};