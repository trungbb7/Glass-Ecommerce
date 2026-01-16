interface CategoryItemProps {
  image: string;
  category: string;
  inStock: number;
  onClick: () => void;
  className?: string;
}

export default function CategoryItem({
  image,
  category,
  inStock,
  onClick,
  className,
}: CategoryItemProps) {
  return (
    <div
      onClick={() => onClick()}
      className={`flex gap-6 items-center p-3 border border-gray-300 shadow rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer ${className}`}
    >
      {/* Image */}
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="size-20 bg-cover bg-center"
      ></div>
      {/* Info */}
      <div>
        <p className="text-lg font-bold">{category}</p>
        <p className="font-medium">({inStock} items)</p>
      </div>
    </div>
  );
}
