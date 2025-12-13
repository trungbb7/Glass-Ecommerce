interface CategoryHeadingProps {
  title: string;
  description: string;
  className?: string;
}

export default function CategoryHeading({
  title,
  description,
  className,
}: CategoryHeadingProps) {
  return (
    <div className={className}>
      <div className="flex gap-4 items-center mb-3">
        <div className="w-4 h-10 bg-secondary rounded-sm"></div>
        <div className="text-secondary font-semibold">{title}</div>
      </div>
      <div className="font-bold text-2xl">{description}</div>
    </div>
  );
}
