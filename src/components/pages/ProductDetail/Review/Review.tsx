import ReviewInfo from "../ReviewInfo/ReviewInfo";
import ReviewItem from "../ReviewItem/ReviewItem";

export default function Review() {
  return (
    <div className="">
      <div className="flex flex-col gap-8">
        {/* Head */}
        <ReviewInfo />
        {/* Review List */}
        <div className="max-w-150">
          <p className="text-xl font-semibold mb-6">Đánh giá</p>
          <ul className="flex flex-col gap-4">
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
          </ul>
        </div>
      </div>
    </div>
  );
}
