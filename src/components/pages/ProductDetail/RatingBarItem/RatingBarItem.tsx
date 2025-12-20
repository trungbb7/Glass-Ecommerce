import { Rating } from "@/components/Rating";

export default function RatingBarItem() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-60 ">
        <div className="h-1.5 bg-green-700 rounded-lg"></div>
      </div>
      <Rating rating={5} size="xs" />
      <div className="text-sm text-secondary">70%</div>
    </div>
  );
}
