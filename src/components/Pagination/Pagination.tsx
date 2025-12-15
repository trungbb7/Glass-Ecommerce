interface PaginationProps {
  className?: string;
}

export default function Pagination({ className }: PaginationProps) {
  return (
    <nav className={`text-text2 ${className}`}>
      <ul className="flex">
        <li className="font-medium border border-gray-200 p-2 bg-neutral-50 rounded-s-2xl hover:bg-neutral-100 cursor-pointer">
          Trước
        </li>
        <li
          aria-checked="true"
          className="font-medium border border-gray-200 p-2 bg-neutral-50 text-center min-w-10 hover:bg-neutral-100 cursor-pointer  aria-checked:text-secondary"
        >
          1
        </li>
        <li
          aria-checked="false"
          className="font-medium border border-gray-200 p-2 bg-neutral-50  text-center min-w-10 hover:bg-neutral-100 cursor-pointer  aria-checked:text-secondary"
        >
          2
        </li>
        <li
          aria-checked="false"
          className="font-medium border border-gray-200 p-2 bg-neutral-50  text-center min-w-10 hover:bg-neutral-100 cursor-pointer  aria-checked:text-secondary"
        >
          3
        </li>
        <li
          aria-checked="false"
          className="font-medium border border-gray-200 p-2 bg-neutral-50  text-center min-w-10 hover:bg-neutral-100 cursor-pointer  aria-checked:text-secondary"
        >
          4
        </li>
        <li
          aria-checked="false"
          className="font-medium border border-gray-200 p-2 bg-neutral-50  text-center min-w-10 hover:bg-neutral-100 cursor-pointer  aria-checked:text-secondary"
        >
          5
        </li>
        <li className="font-medium border border-gray-200 p-2 bg-neutral-50 rounded-e-2xl hover:bg-neutral-100 cursor-pointer">
          Sau
        </li>
      </ul>
    </nav>
  );
}
