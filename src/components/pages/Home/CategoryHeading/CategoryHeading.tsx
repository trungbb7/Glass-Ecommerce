import TimeCounter from "../TimeCounter/TimeCounter";

interface CategoryHeadingProps {
  title: string;
  description: string;
  className?: string;
  endDate?: Date;
}

export default function CategoryHeading({
  title,
  description,
  className,
  endDate,
}: CategoryHeadingProps) {
  return (
    <div className={className}>
      <div className="flex gap-4 items-center mb-3">
        <div className="w-4 h-10 bg-secondary rounded-sm"></div>
        <div className="text-secondary font-semibold">{title}</div>
      </div>
      <div className="flex gap-20 items-center">
        <span className="font-bold text-2xl">{description}</span>
        {endDate && <TimeCounter endDate={endDate} />}
      </div>
    </div>
  );
}
