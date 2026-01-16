import { Rating } from "@/components/Rating";
import userAvatar from "@/assets/user_avatar.png";
import type { ProductReview } from "@/types/product";

interface ReviewItemProps {
  review: ProductReview;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <li>
      <div className="flex items-start gap-4">
        <img src={userAvatar} alt="user avatar" className="size-10" />
        <div>
          <div className="flex items-center gap-4">
            <span className="font-medium">{review.username}</span>
            <span className="text-sm text-gray-400">{review.datetime}</span>
          </div>
          <Rating rating={review.rating} size="xs" className="mb-2" />
          <p className="text-black mb-1">{review.title}</p>
          <p className="text-text2">{review.content}</p>
        </div>
      </div>
      <div className="h-px bg-gray-300 mt-8"></div>
    </li>
  );
}
