import type { ProductReview } from "@/types/product";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewInfo from "../ReviewInfo/ReviewInfo";
import ReviewItem from "../ReviewItem/ReviewItem";

interface ReviewProps {
  reviews: ProductReview[];
}

export default function Review({ reviews }: ReviewProps) {
  return (
    <div className="">
      <div className="flex flex-col gap-8">
        {/* Head */}
        <ReviewInfo />
        {/* Review List */}
        <div className="max-w-150">
          <p className="text-xl font-semibold mb-6">Đánh giá</p>
          <ul className="flex flex-col gap-4">
            {reviews.map((item) => (
              <ReviewItem review={item} key={item.id} />
            ))}
          </ul>
        </div>

        <ReviewForm />
      </div>
    </div>
  );
}
