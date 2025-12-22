import { Button } from "@/components/Button";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type RatingType = 1 | 2 | 3 | 4 | 5;

export default function ReviewForm() {
  const [rating, setRating] = useState<RatingType>(5);
  const [hoverRating, setHoverRating] = useState<RatingType | null>(null);

  function selectRating(rate: RatingType) {
    setRating(rate);
  }

  const ratingVariants = {
    1: "[&>:nth-child(n+5)]:text-yellow-400",
    2: "[&>:nth-child(n+4)]:text-yellow-400",
    3: "[&>:nth-child(n+3)]:text-yellow-400",
    4: "[&>:nth-child(n+2)]:text-yellow-400",
    5: "[&>:nth-child(n+1)]:text-yellow-400",
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-lg">Đánh giá của bạn</p>
      {/* Star */}
      <div>
        <p className="text-text1 mb-2">Mức độ hài lòng</p>
        <ul
          className={`flex justify-end flex-row-reverse h-4 text-neutral-400 gap-1 ${ratingVariants[hoverRating || rating]}`}
        >
          <FontAwesomeIcon
            onMouseEnter={() => setHoverRating(5)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => selectRating(5)}
            icon={faStar}
            className="text-sm transition-all hover:text-lg"
          />

          <FontAwesomeIcon
            onMouseEnter={() => setHoverRating(4)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => selectRating(4)}
            icon={faStar}
            className="text-sm transition-all hover:text-lg"
          />

          <FontAwesomeIcon
            onMouseEnter={() => setHoverRating(3)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => selectRating(3)}
            icon={faStar}
            className="text-sm transition-all hover:text-lg"
          />

          <FontAwesomeIcon
            onMouseEnter={() => setHoverRating(2)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => selectRating(2)}
            icon={faStar}
            className="text-sm transition-all hover:text-lg"
          />
          <FontAwesomeIcon
            onMouseEnter={() => setHoverRating(1)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => selectRating(1)}
            icon={faStar}
            className="text-sm transition-all hover:text-lg"
          />
        </ul>
      </div>
      {/* Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="review-title">Tiêu đề</label>
        <input
          id="review-title"
          type="text"
          className="max-w-150 py-2 px-3 shadow rounded-lg border border-gray-300 outline-0 focus:border-gray-400"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <label htmlFor="review-content">Nội dung</label>
        <textarea
          name="review-content"
          id="reviewcontent"
          className="max-w-150 h-30 py-2 px-3 shadow rounded-lg border border-gray-300 outline-0 focus:border-gray-400"
        ></textarea>
      </div>

      <Button type="primary">Gửi</Button>
    </div>
  );
}
