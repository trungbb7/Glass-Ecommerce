import productImg1 from "@/assets/product_img1.jpg";
import ProductItem from "@/components/ProductItem/ProductItem";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

export function RelatedProducts() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  function slideRight() {
    if (sliderRef.current) {
      const slider = sliderRef.current as HTMLDivElement;
      slider.scrollLeft = slider.scrollLeft + 290;
    }
  }

  function slideLeft() {
    if (sliderRef.current) {
      const slider = sliderRef.current as HTMLDivElement;
      slider.scrollLeft = slider.scrollLeft - 290;
    }
  }

  return (
    <div className="relative  mt-20">
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

      <p className="font-medium text-2xl mb-6 ">Sản phẩm liên quan</p>
      <div
        ref={sliderRef}
        className="w-full flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        <ProductItem
          className="min-w-70"
          img={productImg1}
          discountPercent={40}
          name="Kính Mát MN1268"
          discountPrice={420000}
          stockPrice={500000}
        />

        <ProductItem
          className="min-w-70"
          img={productImg1}
          discountPercent={40}
          name="Kính Mát MN1268"
          discountPrice={420000}
          stockPrice={500000}
        />

        <ProductItem
          className="min-w-70"
          img={productImg1}
          discountPercent={40}
          name="Kính Mát MN1268"
          discountPrice={420000}
          stockPrice={500000}
        />

        <ProductItem
          className="min-w-70"
          img={productImg1}
          discountPercent={40}
          name="Kính Mát MN1268"
          discountPrice={420000}
          stockPrice={500000}
        />

        <ProductItem
          className="min-w-70"
          img={productImg1}
          discountPercent={40}
          name="Kính Mát MN1268"
          discountPrice={420000}
          stockPrice={500000}
        />

        <ProductItem
          className="min-w-70"
          img={productImg1}
          discountPercent={40}
          name="Kính Mát MN1268"
          discountPrice={420000}
          stockPrice={500000}
        />

        <ProductItem
          className="min-w-70"
          img={productImg1}
          discountPercent={40}
          name="Kính Mát MN1268"
          discountPrice={420000}
          stockPrice={500000}
        />
      </div>
    </div>
  );
}
