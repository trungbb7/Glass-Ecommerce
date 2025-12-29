import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGlasses,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "@/hooks";
import { Link } from "react-router-dom";
import SearchResult from "./SearchResult/SearchResult";
export default function Header() {
  const shaking = useAppSelector((state) => state.header.cartShaking);
  const bounce = useAppSelector((state) => state.header.wishlistBounce);

  return (
    <header className="sticky top-0 flex justify-between px-25 py-4 border-b border-gray-200 bg-white shadow-xs z-10">
      {/* Left side */}
      <div className="flex items-center">
        {/* Left 1 */}
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center mr-10">
              <FontAwesomeIcon
                icon={faGlasses}
                className="text-secondary mr-2"
                size="2xl"
              />
              <span className="text-2xl">GlassesHub</span>
            </div>
          </Link>

          {/* Menu */}
          <div>
            <Link to="/">
              <span className="text-base mr-6 hover:text-secondary cursor-pointer">
                Trang chủ
              </span>
            </Link>
            <Link to="/product">
              <span className="text-base mr-6 hover:text-secondary cursor-pointer">
                Sản phẩm
              </span>
            </Link>

            <Link to="/contact">
              <span className="text-base mr-6 hover:text-secondary cursor-pointer">
                Liên hệ
              </span>
            </Link>

            <Link to="/about">
              <span className="text-base mr-6 hover:text-secondary cursor-pointer">
                Giới thiệu
              </span>
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative flex items-center bg-primary-light p-2.5 rounded-xl border-3 border-transparent has-focus:border-gray-300 transition-colors duration-200 ease-linear">
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
          <SearchResult />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center">
        {/* Whish list */}
        <div className="relative mr-6 px-2 py-1.5 bg-transparent hover:bg-primary-light rounded-md cursor-pointer">
          <FontAwesomeIcon icon={faHeart} bounce={bounce} id="wishlist" />
          <span className="absolute -right-1 -top-0.5 px-1.5 rounded-full bg-secondary text-white text-xs font-semibold">
            5
          </span>
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
    </header>
  );
}
