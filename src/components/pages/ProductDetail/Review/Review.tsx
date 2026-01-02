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
        <ReviewInfo
          one={reviews.reduce((acc, cur) => {
            if (cur.rating === 1) {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0)}
          two={reviews.reduce((acc, cur) => {
            if (cur.rating === 2) {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0)}
          three={reviews.reduce((acc, cur) => {
            if (cur.rating === 3) {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0)}
          four={reviews.reduce((acc, cur) => {
            if (cur.rating === 4) {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0)}
          five={reviews.reduce((acc, cur) => {
            if (cur.rating === 5) {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0)}
          count={reviews.length}
        />
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
