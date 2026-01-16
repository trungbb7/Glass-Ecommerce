import type { FilterItem } from "@/types/filter";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";

export interface ItemData {
  title: string;
  checked: boolean;
  quantity: number;
  query: string;
}

export interface SidebarSelectorItemProps {
  data: FilterItem;
  selectItem: (query: string[]) => void;
  param: string;
  value: string;
  className?: string;
}

export default function SidebarSelectorItem({
  data,
  selectItem,
  param,
  value,
  className,
}: SidebarSelectorItemProps) {
  const [searchParams] = useSearchParams();

  const SearchParamValue = searchParams.get(param);
  let checked = SearchParamValue === value;
  if (!SearchParamValue && data.title === "Tất cả") {
    checked = true;
  }

  return (
    <li
      onClick={() => selectItem(data.query)}
      className={`${!checked && "text-text2"} font-medium flex items-center justify-between cursor-pointer hover:text-text1 ${className}`}
    >
      <div className="flex gap-2 items-center">
        <div
          className={`${checked ? "text-secondary" : "text-secondary-200"} text-xl`}
        >
          {checked ? (
            <FontAwesomeIcon icon={faSquareCheck} />
          ) : (
            <FontAwesomeIcon icon={faSquare} />
          )}
        </div>
        {/* Title */}
        <p className="">{data.title}</p>
      </div>
      {/* quantity */}
      <span>{data.quantity}</span>
    </li>
  );
}
