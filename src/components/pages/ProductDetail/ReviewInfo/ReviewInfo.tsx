import { Rating } from "@/components/Rating";
import RatingBarItem from "../RatingBarItem/RatingBarItem";

export default function ReviewInfo() {
  return (
    <div>
      <p className="text-2xl font-semibold mb-6">Phản hồi của khách hàng</p>
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-2 items-center bg-[#f8f7fc] px-15 py-10 rounded-lg size-fit">
          <span className="text-6xl font-semibold text-secondary">4.8</span>
          <Rating rating={5} size="sm" />
          <span>Điểm sản phẩm</span>
        </div>
        <div className="flex flex-col gap-2 bg-[#f8f7fc] rounded-lg p-6">
          <RatingBarItem rating={5} percent={70} />
          <RatingBarItem rating={4} percent={15} />
          <RatingBarItem rating={3} percent={10} />
          <RatingBarItem rating={2} percent={3} />
          <RatingBarItem rating={1} percent={2} />
        </div>
      </div>
    </div>
  );
}
