import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGlasses,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "@/hooks";
export default function Header() {
  const shaking = useAppSelector((state) => state.header.shaking);

  return (
    <div className="sticky top-0 flex justify-between px-25 py-4 border-b border-gray-200 bg-white shadow-xs z-10">
      {/* Left side */}
      <div className="flex items-center">
        {/* Left 1 */}
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center mr-10">
            <FontAwesomeIcon
              icon={faGlasses}
              className="text-secondary mr-2"
              size="2xl"
            />
            <span className="text-2xl">GlassesHub</span>
          </div>

          {/* Menu */}
          <div>
            <span className="text-base mr-6 hover:text-secondary cursor-pointer">
              Trang chủ
            </span>
            <span className="text-base mr-6 hover:text-secondary cursor-pointer">
              Sản phẩm
            </span>
            <span className="text-base mr-6 hover:text-secondary cursor-pointer">
              Liên hệ
            </span>
            <span className="text-base mr-6 hover:text-secondary cursor-pointer">
              Giới thiệu
            </span>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center bg-primary-light p-2.5 rounded-xl border-3 border-transparent has-focus:border-gray-300 transition-colors duration-200 ease-linear">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-gray-400 mr-3"
          />
          <input
            id="search"
            className="outline-none text-sm text-gray-400 w-120"
            type="text"
            placeholder="Search products"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center">
        {/* Whish list */}
        <div className="mr-6 px-2 py-1.5 bg-transparent hover:bg-primary-light rounded-md cursor-pointer">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        {/* User */}
        <div className="mr-6 px-2 py-1.5 bg-transparent hover:bg-primary-light rounded-md cursor-pointer">
          <FontAwesomeIcon icon={faUser} />
        </div>
        {/* Cart */}
        <div className="relative mr-6 px-2 py-1.5 bg-transparent hover:bg-primary-light rounded-md cursor-pointer">
          <FontAwesomeIcon icon={faCartShopping} shake={shaking} id="cart" />
          <span className="absolute -right-1 -top-0.5 px-1.5 rounded-full bg-secondary text-white text-xs font-semibold">
            2
          </span>
        </div>
      </div>
    </div>
  );
}
