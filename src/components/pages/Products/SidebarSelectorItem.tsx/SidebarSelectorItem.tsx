import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ItemData {
  title: string;
  quantity: number;
  checked: boolean;
}

export interface SidebarSelectorItemProps {
  data: ItemData;
  selectItem: (title: string) => void;
  className?: string;
}

export default function SidebarSelectorItem({
  data,
  selectItem,
  className,
}: SidebarSelectorItemProps) {
  return (
    <li
      onClick={() => selectItem(data.title)}
      aria-checked={data.checked}
      className={`${!data.checked && "text-text2"} font-medium flex items-center justify-between cursor-pointer hover:text-text1 ${className}`}
    >
      <div className="flex gap-2 items-center">
        <div
          className={`${data.checked ? "text-secondary" : "text-secondary-200"} text-xl`}
        >
          {data.checked ? (
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
