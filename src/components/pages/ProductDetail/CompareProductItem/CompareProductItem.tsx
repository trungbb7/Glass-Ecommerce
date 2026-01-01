interface CompareProductItemProps {
  title: string;
  leftItem: string;
  rightItem: string;
}

export default function CompareProductItem({
  title,
  leftItem,
  rightItem,
}: CompareProductItemProps) {
  return (
    <li className="flex items-center text-center font-medium odd:bg-red-50 even:bg-white">
      <span className="flex-4  p-4">{leftItem}</span>
      <span className="flex-2 p-4 bg-slate-700 text-white h-full">{title}</span>
      <span className="flex-4 p-4">{rightItem}</span>
    </li>
  );
}
