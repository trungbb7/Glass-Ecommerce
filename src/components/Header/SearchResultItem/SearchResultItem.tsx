export default function SearchResultItem() {
  return (
    <li className="flex gap-4 items-center px-4 py-2 rounded-2xl hover:bg-neutral-200 cursor-pointer">
      <img
        src="https://i.ibb.co/Wp03L8VQ/IMG-2119.jpg"
        alt="product image"
        className="size-15 rounded-full"
      />
      <div>
        <p className="font-medium hover:underline">
          Kính Râm EYEPLUS 2231 C1 ĐEN NHÁM
        </p>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-secondary font-medium">175000 VNĐ</span>
          <span className="text-sm text-neutral-400 font-medium line-through">
            350000 VNĐ
          </span>
        </div>
      </div>
    </li>
  );
}
