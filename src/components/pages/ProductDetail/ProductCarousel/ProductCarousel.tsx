import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useRef, useState } from "react";

interface ProductCarouselProp {
  images: string[];
}

const ProductCarousel = forwardRef<
  HTMLImageElement | null,
  ProductCarouselProp
>(({ images }, ref) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef<HTMLUListElement | null>(null);

  function slideRight() {
    if (sliderRef.current) {
      const slider = sliderRef.current as HTMLUListElement;
      slider.scrollLeft = slider.scrollLeft + 100;
    }
  }

  function slideLeft() {
    if (sliderRef.current) {
      const slider = sliderRef.current as HTMLUListElement;
      slider.scrollLeft = slider.scrollLeft - 100;
    }
  }

  function setImage(index: number) {
    setCurrentImageIndex(index);
  }

  return (
    <div className="flex flex-col gap-4 grow-5 w-1/2">
      {/* Image representation */}
      <div>
        <img
          ref={ref}
          src={images[currentImageIndex]}
          alt="img"
          className="w-150 h-107 object-cover border border-gray-100 cursor-pointer hover:shadow-sm"
        />
      </div>
      {/* Image list */}
      <div className="relative max-w-150">
        <div
          onClick={slideLeft}
          className="absolute left-0 top-1/2 z-10 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            size="2xl"
            className="text-white/50 hover:text-white"
          />
        </div>

        <div
          onClick={slideRight}
          className="absolute right-0 top-1/2 z-10 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            size="2xl"
            className="text-white/50 hover:text-white"
          />
        </div>
        <ul
          ref={sliderRef}
          className="w-fit flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {images.map((image, index) => (
            <li
              onClick={() => {
                setImage(index);
              }}
              key={image}
              className="shrink-0 size-fit border border-gray-100 cursor-pointer hover:shadow-sm"
            >
              <img src={image} alt="img" className="size-36 object-cover " />
            </li>
          ))}
        </ul>
      </div>

      <div></div>
    </div>
  );
});

export default ProductCarousel;
