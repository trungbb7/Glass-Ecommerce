import { useAppDispatch } from "@/hooks";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import {
  startBounceWishlist,
  startShakingCart,
  stopBounceWishlist,
  stopShakingCart,
} from "../Header/headerSlice";
import { Rating } from "../Rating";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  id: string;
  img: string;
  discountPercent: number;
  name: string;
  stockPrice: number;
  finalPrice: number;
  colors: string[];
  isWishList?: boolean;
  className?: string;
}

export default function ProductItem({
  id,
  img,
  discountPercent,
  name,
  stockPrice,
  finalPrice,
  colors = [],
  isWishList = false,
  className,
}: ProductItemProps) {
  if (!colors) {
    console.log(`Colors undefined - id: ${id}`);
  }

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const imgRef = useRef<HTMLImageElement>(null);

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
    event: React.MouseEvent<HTMLElement, MouseEvent>,
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

  function handleRemoveWishList() {
    console.log("Remove wishlist item");
  }

  function goToDetail() {
    navigate(`/product/${id}`);
  }

  return (
    <div
      className={`max-w-70 h-108 pb-4 rounded-lg border border-gray-200 cursor-pointer ${className}`}
    >
      {/* Top */}
      <div className="group/top relative mb-2 overflow-hidden">
        <img
          ref={imgRef}
          src={img}
          alt={name}
          className="size-70 object-cover rounded-lg group-hover/top:scale-[1.2] transition-all"
        />
        <div className="absolute top-2 left-2 text-xs font-medium text-white px-2 py-1 rounded-sm bg-secondary">
          -{discountPercent}%
        </div>

        {isWishList ? (
          <div
            onClick={handleRemoveWishList}
            className="absolute top-2 right-2 p-0.5 rounded-sm bg-white/10 hover:shadow hover:bg-white cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              className="text-gray-300 hover:text-black"
            />
          </div>
        ) : (
          <div
            onClick={(e) => {
              handleAddToWishList(e);
            }}
            className="absolute top-2 right-2 p-0.5 rounded-sm bg-white/10 hover:shadow hover:bg-white cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faHeart}
              className="text-gray-300 hover:text-black"
            />
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="group/img absolute bottom-0 left-0 right-0 flex gap-2 items-center justify-center h-0 bg-black text-white hover:text-secondary group-hover/top:h-10 transition-all"
        >
          <div className="relative overflow-hidden size-4.5">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="absolute inset-0 translate-y-[100px] group-hover/img:translate-y-0 transition-all"
            />
            <FontAwesomeIcon
              icon={faCartShopping}
              className="absolute inset-0 translate-y-0 group-hover/img:-translate-y-[100px] transition-all"
            />
          </div>
          Thêm vào giỏ hàng
        </button>

        <div
          onClick={goToDetail}
          className="absolute top-12 right-2 p-0.5 rounded-sm bg-white/10 hover:shadow hover:bg-white cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faEye}
            className="text-gray-300 hover:text-black"
          />
        </div>
      </div>
      {/* Body */}
      <div className="px-2">
        {/* Name */}
        <p
          onClick={goToDetail}
          className="mb-2 text-lg font-medium hover:underline"
        >
          {name}
        </p>

        {/* Colors */}
        <ul className="flex gap-2">
          {colors.map((color) => (
            <li
              key={color}
              style={{ backgroundColor: color }}
              className="size-4 border border-amber-300 rounded-full"
            ></li>
          ))}
        </ul>

        {/* Price */}
        <div>
          <span className="text-secondary mr-2 font-medium">
            {formatter.format(finalPrice)}
          </span>
          <span className="text-gray-300 line-through font-medium">
            {formatter.format(stockPrice)}
          </span>
        </div>

        {/* Rating */}
        <Rating size="sm" rating={4} />
      </div>
    </div>
  );
}
