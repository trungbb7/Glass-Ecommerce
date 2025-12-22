import { forwardRef, useState } from "react";

interface ProductCarouselProp {
  images: string[];
}

const ProductCarousel = forwardRef<
  HTMLImageElement | null,
  ProductCarouselProp
>(({ images }, ref) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  function setImage(image: string) {
    setCurrentImage(image);
  }
  return (
    <div className="flex flex-col gap-4 grow-5 w-1/2">
      {/* Image representation */}
      <div>
        <img
          ref={ref}
          src={currentImage}
          alt="img"
          className="w-150 h-107 object-cover border border-gray-100 cursor-pointer hover:shadow-sm"
        />
      </div>
      {/* Image list */}
      <ul className="flex gap-1.5">
        {images.map((image) => (
          <li
            onClick={() => {
              setImage(image);
            }}
            key={image}
            className="border border-gray-100 cursor-pointer hover:shadow-sm"
          >
            <img src={image} alt="img" className="size-36 object-cover" />
          </li>
        ))}
      </ul>
      <div></div>
    </div>
  );
});

export default ProductCarousel;
