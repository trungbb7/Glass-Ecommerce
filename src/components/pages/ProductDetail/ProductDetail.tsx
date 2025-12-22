import Breadcrumb, {
  type BreadcrumbData,
} from "@/components/Breadcrumb/Breadcrumb";
import { Header } from "@/components/Header";
import {
  faArrowRotateLeft,
  faCartShopping,
  faHouse,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "@/assets/product_image_representation/1.jpg";
import img2 from "@/assets/product_image_representation/2.jpg";
import img3 from "@/assets/product_image_representation/3.jpg";
import img4 from "@/assets/product_image_representation/4.jpg";
import { Footer } from "@/components/Footer";
import { Rating } from "@/components/Rating";
import { Button } from "@/components/Button";
import { faHeart, faTruck } from "@fortawesome/free-regular-svg-icons";
import Review from "./Review/Review";
import ColorItem from "./ColorItem/ColorItem";
import { useRef, useState } from "react";
import { useAppDispatch } from "@/hooks";
import {
  startBounceWishlist,
  startShakingCart,
  stopBounceWishlist,
  stopShakingCart,
} from "@/components/Header/headerSlice";
import ProductSpecification from "./ProductSpecification/ProductSpecification";
import ProductCarousel from "./ProductCarousel/ProductCarousel";
import { RelatedProducts } from "./RelatedProducts/RelatedProducts";

const breadcrumbData: BreadcrumbData[] = [
  { name: "Trang chủ", path: "/", icon: <FontAwesomeIcon icon={faHouse} /> },
  {
    name: "Sản phẩm",
    path: "/products",
  },
  {
    name: "EYE PLUS TR855",
    path: "/products/tr855",
  },
];

const product = {
  name: "KÍNH RÂM EYE PLUS TR855",
  rating: 5,
  numReviews: 150,
  inStock: true,
  stockPrice: 900000,
  finalPrice: 690000,
  briefDescription:
    "Kính râm TR855 C1 sở hữu thiết kế vuông bo góc hiện đại, mang đến vẻ ngoài cá tính nhưng không kém phần thanh lịch. Gọng kính làm từ chất liệu nhựa TR cứng cáp, chắc chắn, bền nhẹ và có thể nắn chỉnh linh hoạt. Điểm nhấn kim loại ở phần bản lề giúp tăng độ độc đáo cho tổng thể thiết kế.",
  variants: [
    {
      color: "#000000",
      quantity: 10,
    },
    { color: "#d67900", quantity: 0 },
  ],
  specification: {
    lensWidth: 56,
    templeLength: 145,
    bridgeWidth: 17,
    brand: "Cartier",
    origin: "Hàn Quốc",
    suitableFor: "Male",
    warranty: "1 năm",
    material: "Nhựa",
  },
  images: [img1, img2, img3, img4],
};

export default function ProductDetail() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [currentVariance, setCurrentVariance] = useState(
    product.variants[0].color,
  );

  const [quantity, setQuantity] = useState(1);

  const [currentStock, setCurrentInstock] = useState(
    product.variants[0].quantity,
  );
  const [currentTab, setCurrentTab] = useState<"specification" | "review">(
    "specification",
  );

  const dispatch = useAppDispatch();

  function getCurrentStock() {
    return product.variants.find((item) => item.color === currentVariance)
      ?.quantity as number;
  }

  function increaseQuantity() {
    const value = Math.min(quantity + 1, currentStock);
    setQuantity(value);
  }

  function decreaseQuantity() {
    const value = Math.max(quantity - 1, 1);
    setQuantity(value);
  }

  function setVariance(color: string) {
    setCurrentVariance(color);

    const instock = product.variants.find((item) => item.color === color)
      ?.quantity as number;

    setQuantity(Math.min(instock ? 1 : 0));
    setCurrentInstock(instock);
  }

  function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    // Add-to-cart effect
    if (imgRef.current) {
      const startRect = event.currentTarget.getBoundingClientRect();

      const cart = document.getElementById("cart") as HTMLElement;
      const endRect = cart?.getBoundingClientRect();

      const flyingImg = imgRef.current?.cloneNode() as HTMLImageElement;

      flyingImg.style.left = startRect.left + "px";
      flyingImg.style.top = startRect.top + "px";

      flyingImg.classList.add("flying-image");

      document.body.appendChild(flyingImg);
      setTimeout(() => {
        const deltaX = endRect.left - startRect.left;
        const deltaY = endRect.top - startRect.top;

        flyingImg.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
        flyingImg.style.opacity = "0.5";
      }, 10);

      setTimeout(() => {
        flyingImg.remove();
        dispatch(startShakingCart());

        setTimeout(() => {
          dispatch(stopShakingCart());
        }, 200);
      }, 500);
    }
  }

  function handleAddToWishList(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    // Add-to-cart effect
    if (imgRef.current) {
      const startRect = event.currentTarget.getBoundingClientRect();

      const wishlist = document.getElementById("wishlist") as HTMLElement;
      const endRect = wishlist?.getBoundingClientRect();

      const flyingImg = imgRef.current?.cloneNode() as HTMLImageElement;

      flyingImg.style.left = startRect.left + "px";
      flyingImg.style.top = startRect.top + "px";

      flyingImg.classList.add("flying-image");

      document.body.appendChild(flyingImg);
      setTimeout(() => {
        const deltaX = endRect.left - startRect.left;
        const deltaY = endRect.top - startRect.top;

        flyingImg.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
        flyingImg.style.opacity = "0.5";
      }, 10);

      setTimeout(() => {
        flyingImg.remove();
        dispatch(startBounceWishlist());

        setTimeout(() => {
          dispatch(stopBounceWishlist());
        }, 500);
      }, 500);
    }
  }

  return (
    <div className="text-text1">
      <Header />

      <div className="px-30 pb-20">
        {/* Top */}
        <div className="pt-4 pb-10">
          <Breadcrumb data={breadcrumbData} />
        </div>

        {/* Body */}
        <div className="flex gap-8 mb-30">
          {/* Product Images */}
          <ProductCarousel images={product.images} ref={imgRef} />

          <div className="grow-5 w-1/2 flex flex-col gap-4 ">
            {/* Product name */}
            <p className="text-2xl font-semibold">{product.name}</p>
            <div className="flex items-center gap-4">
              {/* Rating */}
              <Rating size="sm" rating={5} />
              <p className="text-sm text-text2">
                ({product.numReviews} Đánh giá)
              </p>
              <div className="w-0.5 bg-text2 h-4"></div>
              <p
                style={{ color: currentStock > 0 ? "#05df72" : "#f27474" }}
                className="text-green-400 text-sm font-medium"
              >
                {currentStock > 0 ? "Còn hàng" : "Hết hàng"}
              </p>
            </div>
            {/* Price */}
            <div className="flex items-center gap-4">
              {/* current */}
              <p className="text-text1 text-lg font-medium">
                {product.finalPrice} VNĐ
              </p>
              {/* stock */}
              <p className="text-text2 text-lg font-medium line-through">
                {product.stockPrice} VNĐ
              </p>
            </div>

            {/* Brief Descripion */}
            <p className="font-medium text-sm text-text2">
              {product.briefDescription}
            </p>

            <div className="h-px bg-text2 mt-4"></div>

            {/* Colors */}
            <div className="flex items-center gap-6">
              <span className="text-lg">Màu sắc:</span>
              <ul className="flex items-center gap-2">
                {product.variants.map((item) => (
                  <ColorItem
                    setVariance={setVariance}
                    active={item.color === currentVariance}
                    color={item.color}
                    key={item.color}
                  />
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <span>Còn lại:</span>
              <span className="font-medium">{getCurrentStock()}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity selection */}
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="border-2 border-gray-300 p-2 rounded-l-md cursor-pointer hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <div className="text-center font-medium border-y-2 border-gray-300 py-2 w-20">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className=" p-2.5 bg-secondary text-white rounded-r-md cursor-pointer hover:bg-secondary-500"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              {/*  */}
              <Button type="primary" className="py-2.5 px-8">
                Mua ngay
              </Button>
              <Button
                onClick={(e) => {
                  handleAddToCart(e);
                }}
                type="secondary"
                className="py-2.5 px-6"
              >
                <FontAwesomeIcon icon={faCartShopping} /> Thêm vào giỏ hàng
              </Button>
              <Button
                onClick={(e) => {
                  handleAddToWishList(e);
                }}
                type="secondary"
              >
                <FontAwesomeIcon icon={faHeart} />
              </Button>
            </div>

            {/* Promotion */}
            <div className="flex flex-wrap flex-row gap-3 mt-4">
              <div className="grow w-1/2 flex gap-4 items-center p-3 border-2 border-gray-500">
                <FontAwesomeIcon
                  icon={faTruck}
                  size="lg"
                  className="font-medium"
                />
                <div>
                  <p className="font-medium text-lg">Miễn phí vẫn chuyển</p>
                  <p className="font-medium text-sm">
                    Miễn phí vận chuyển khắp cả nước
                  </p>
                </div>
              </div>

              <div className="grow w-1/2 flex gap-4 items-center p-3 border-2 border-gray-500">
                <FontAwesomeIcon
                  icon={faArrowRotateLeft}
                  size="lg"
                  className="font-medium"
                />
                <div>
                  <p className="font-medium text-lg">Hoàn trả miễn phí</p>
                  <p className="font-medium text-sm">
                    30 ngày hoàn trả miễn phí
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Top */}
          <div className="flex mb-10">
            {/* Description */}
            <div
              onClick={() => setCurrentTab("specification")}
              data-active={currentTab === "specification"}
              className="w-fit text-neutral-400 font-normal text-center text-lg p-4 border-b-4 border-b-neutral-400 cursor-pointer hover:text-secondary-200 data-[active=true]:font-medium data-[active=true]:text-secondary data-[active=true]:border-b-secondary-400"
            >
              Đặc tả
            </div>

            <div
              onClick={() => {
                setCurrentTab("review");
              }}
              data-active={currentTab === "review"}
              className="w-fit text-neutral-400 font-normal text-center text-lg p-4 border-b-4 border-b-neutral-400 cursor-pointer hover:text-secondary-200 data-[active=true]:font-medium data-[active=true]:text-secondary data-[active=true]:border-b-secondary-400"
            >
              Đánh giá
            </div>

            <div className="grow border-b-4 border-b-neutral-400"></div>
          </div>

          {/* Specification */}
          {currentTab === "specification" && (
            <ProductSpecification
              lensWidth={product.specification.lensWidth}
              templeLength={product.specification.templeLength}
              brand={product.specification.brand}
              bridgeWidth={product.specification.bridgeWidth}
              material={product.specification.material}
              origin={product.specification.origin}
              suitableFor={product.specification.suitableFor}
              warranty={product.specification.warranty}
            />
          )}

          {/* Review */}
          {currentTab === "review" && <Review />}
        </div>

        {/* Related products */}
        <RelatedProducts />
      </div>
      <Footer />
    </div>
  );
}
