import { Rating } from "@/components/Rating";
import userAvatar from "@/assets/user_avatar.png";

export default function ReviewItem() {
  return (
    <li>
      <div className="flex items-start gap-4">
        <img src={userAvatar} alt="user avatar" className="size-10" />
        <div>
          <div className="flex items-center gap-4">
            <span className="font-medium">N.V.An</span>
            <span className="text-sm text-gray-400">3 ngày trước</span>
          </div>
          <Rating rating={5} size="xs" className="mb-2" />
          <p className="text-black mb-1">Sản phẩm tốt</p>
          <p className="text-text2">
            Có nhiều phiên bản khác nhau của sản phẩm cùng loại, nhưng đây là
            sản phẩm tốt nhất trong tầm giá
          </p>
        </div>
      </div>
      <div className="h-px bg-gray-300 mt-8"></div>
    </li>
  );
}
