import { Rating } from "@/components/Rating";

interface RatingBarItemProp {
  rating: 1 | 2 | 3 | 4 | 5;
  percent: number;
}

export default function RatingBarItem({ rating, percent }: RatingBarItemProp) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-60 ">
        <div
          style={{ width: `${percent}%` }}
          className="h-1.5 bg-green-700 rounded-lg"
        ></div>
      </div>
      <Rating rating={rating} size="xs" />
      <div className="text-sm text-secondary">{percent}%</div>
    </div>
  );
}
