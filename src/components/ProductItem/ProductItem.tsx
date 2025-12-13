import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProductItemProps {
  img: string;
  discountPercent: number;
  name: string;
  stockPrice: number;
  discountPrice: number;
}

export default function ProductItem({
  img,
  discountPercent,
  name,
  stockPrice,
  discountPrice,
}: ProductItemProps) {
  return (
    <div className="pb-4 rounded-lg border border-gray-200 cursor-pointer">
      {/* Top */}
      <div className="group/top relative mb-2 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="size-70 object-cover rounded-lg group-hover/top:scale-[1.2] transition-all"
        />
        <div className="absolute top-2 left-2 text-xs font-medium text-white px-2 py-1 rounded-sm bg-secondary">
          -{discountPercent}%
        </div>
        <div className="absolute top-2 right-2 p-0.5 rounded-sm bg-white/10 hover:shadow hover:bg-white cursor-pointer">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-gray-300 hover:text-black"
          />
        </div>

        <div className="group/img absolute bottom-0 left-0 right-0 flex gap-2 items-center justify-center h-0 bg-black text-white hover:text-secondary group-hover/top:h-10 transition-all">
          <div className="relative overflow-hidden size-5">
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
        </div>

        <div className="absolute top-12 right-2 p-0.5 rounded-sm bg-white/10 hover:shadow hover:bg-white cursor-pointer">
          <FontAwesomeIcon
            icon={faEye}
            className="text-gray-300 hover:text-black"
          />
        </div>
      </div>
      {/* Body */}
      <div className="px-2">
        <p className="mb-2 text-lg font-medium hover:underline">{name}</p>
        <div>
          <span className="text-secondary mr-2 font-medium">
            ${discountPrice}
          </span>
          <span className="text-gray-300 line-through font-medium">
            ${stockPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
