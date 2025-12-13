interface CategoryItemProps {
  image: string;
  category: string;
  inStock: number;
}

export default function CategoryItem({
  image,
  category,
  inStock,
}: CategoryItemProps) {
  return (
    <div className="flex gap-6 items-center p-3 border border-gray-300 shadow rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer">
      {/* Image */}
      <div>
        <img src={image} className="size-20" alt="img" />
      </div>
      {/* Info */}
      <div>
        <p className="text-lg font-bold">{category}</p>
        <p className="font-medium">({inStock} items)</p>
      </div>
    </div>
  );
}
