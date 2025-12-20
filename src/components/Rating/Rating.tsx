import type { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

interface RatingProps {
  rating: 1 | 2 | 3 | 4 | 5;
  size: SizeProp;
  className?: string;
}

export default function Rating({
  rating,
  className,
  size = "xs",
}: RatingProps) {
  const ratingVariants = {
    1: "[&>li:nth-child(-n+1)]:text-yellow-400",
    2: "[&>li:nth-child(-n+2)]:text-yellow-400",
    3: "[&>li:nth-child(-n+3)]:text-yellow-400",
    4: "[&>li:nth-child(-n+4)]:text-yellow-400",
    5: "[&>li:nth-child(-n+5)]:text-yellow-400",
  };

  const newClassName = clsx(
    "flex text-neutral-400",
    ratingVariants[rating],
    className,
  );

  return (
    <ul className={newClassName}>
      <li>
        <FontAwesomeIcon icon={faStar} size={size} />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} size={size} />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} size={size} />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} size={size} />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} size={size} />
      </li>
    </ul>
  );
}
