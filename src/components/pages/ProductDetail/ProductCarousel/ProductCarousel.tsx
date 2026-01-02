import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useRef, useState, type MouseEvent } from "react";

interface ProductCarouselProp {
  images: string[];
}

const ProductCarousel = forwardRef<
  HTMLImageElement | null,
  ProductCarouselProp
>(({ images }, ref) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef<HTMLUListElement | null>(null);

  const imageRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  function handleMoveMove(e: MouseEvent) {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();

      const x = ((e.pageX - left - window.scrollX) / width) * 100;
      const y = ((e.pageY - top - window.scrollY) / height) * 100;

      const boundedX = Math.max(0, Math.min(x, 100));
      const boundedY = Math.max(0, Math.min(y, 100));

      setPosition({ x: boundedX, y: boundedY });
      setCursorPosition({
        x: e.pageX - left - window.scrollX,
        y: e.pageY - top - window.scrollY,
      });
    }
  }

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
      <div className="relative size-fit">
        <div
          ref={imageRef}
          className="relative overflow-hidden cursor-crosshair"
          onMouseEnter={() => setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
          onMouseMove={handleMoveMove}
        >
          <img
            ref={ref}
            src={images[currentImageIndex]}
            alt="img"
            className="w-150 h-107 object-cover border border-gray-100 cursor-pointer hover:shadow-sm"
          />

          {showMagnifier && (
            <div
              style={{
                left: `${cursorPosition.x - 75}px`,
                top: `${cursorPosition.y - 75}px`,
              }}
              className="absolute left-0 bottom-0 shadow bg-white/80 size-[150px]"
            ></div>
          )}
        </div>
        {showMagnifier && (
          <div className="absolute -right-110 top-0 size-107 bg-white/80 shadow z-99">
            <div
              className="size-full"
              style={{
                backgroundImage: `url(${images[currentImageIndex]})`,
                backgroundPosition: `${position.x}% ${position.y}%`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "250%",
              }}
            ></div>
          </div>
        )}
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
