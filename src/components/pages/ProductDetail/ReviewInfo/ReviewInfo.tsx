import { Rating } from "@/components/Rating";
import RatingBarItem from "../RatingBarItem/RatingBarItem";

interface ReviewInfoProps {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  count: number;
}

export default function ReviewInfo({
  count,
  one,
  two,
  three,
  four,
  five,
}: ReviewInfoProps) {
  const overallRating =
    Math.round(
      one * 1 + two * 2 + three * 3 + four * 4 + ((five * 5) / count) * 10,
    ) / 10;

  return (
    <div>
      <p className="text-2xl font-semibold mb-6">Phản hồi của khách hàng</p>
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-2 items-center bg-[#f8f7fc] px-15 py-10 rounded-lg size-fit">
          <span className="text-6xl font-semibold text-secondary">
            {overallRating}
          </span>
          <Rating
            rating={Math.round(overallRating) as 1 | 2 | 3 | 4 | 5}
            size="sm"
          />
          <span>Điểm sản phẩm</span>
        </div>
        <div className="flex flex-col gap-2 bg-[#f8f7fc] rounded-lg p-6">
          <RatingBarItem
            rating={5}
            percent={Math.round((five / count) * 100)}
          />
          <RatingBarItem
            rating={4}
            percent={Math.round((four / count) * 100)}
          />
          <RatingBarItem
            rating={3}
            percent={Math.round((three / count) * 100)}
          />
          <RatingBarItem rating={2} percent={Math.round((two / count) * 100)} />
          <RatingBarItem rating={1} percent={Math.round((one / count) * 100)} />
        </div>
      </div>
    </div>
  );
}
