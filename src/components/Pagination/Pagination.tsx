interface PaginationProps {
  numPages: number;
  currentPage: number;
  changeNumPage: (page: number) => void;
  className?: string;
}

export default function Pagination({
  className,
  numPages,
  currentPage,
  changeNumPage,
}: PaginationProps) {
  console.log(numPages);

  return (
    <nav className={`text-text2 ${className}`}>
      <ul className="flex">
        <li
          onClick={() => {
            if (currentPage !== 1) {
              changeNumPage(currentPage - 1);
            }
          }}
          data-disabled={currentPage === 1}
          className="font-medium border border-gray-200 p-2 bg-neutral-50 rounded-s-2xl hover:bg-neutral-100 cursor-pointer data-[disabled=true]:text-gray-300 data-[disabled=true]:hover:bg-neutral-50"
        >
          Trước
        </li>

        {[...Array(numPages)].map((_, index) => (
          <li
            onClick={() => {
              changeNumPage(index + 1);
            }}
            key={index}
            data-active={index + 1 === currentPage}
            className="font-medium border border-gray-200 p-2 bg-neutral-50 text-center min-w-10 hover:bg-neutral-100 cursor-pointer  data-[active=true]:text-secondary"
          >
            {index + 1}
          </li>
        ))}
        <li
          onClick={() => {
            if (currentPage < numPages) {
              changeNumPage(currentPage + 1);
            }
          }}
          data-disabled={currentPage === numPages}
          className="font-medium border border-gray-200 p-2 bg-neutral-50 rounded-e-2xl hover:bg-neutral-100 cursor-pointer data-[disabled=true]:text-gray-300 data-[disabled=true]:hover:bg-neutral-50"
        >
          Sau
        </li>
      </ul>
    </nav>
  );
}
