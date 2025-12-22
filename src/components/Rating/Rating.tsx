import type { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const sizeMap = {
  "2xs": "text-2xl",
  xs: "text-xs",
  sm: "text-sm",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "1x": "text-3xl",
  "2x": "text-4xl",
  "3x": "text-5xl",
  "4x": "text-6xl",
  "5x": "text-7xl",
  "6x": "text-8xl",
  "7x": "text-9xl",
  "8x": "text-9xl",
  "9x": "text-9xl",
  "10x": "text-9xl",
};
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
        <FontAwesomeIcon icon={faStar} className={`${sizeMap[size]}`} />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className={sizeMap[size]} />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className={sizeMap[size]} />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className={sizeMap[size]} />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className={sizeMap[size]} />
      </li>
    </ul>
  );
}
