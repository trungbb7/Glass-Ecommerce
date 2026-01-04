import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGlasses } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "@/hooks";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import DropDownSelection from "./DropdownSelection/DropdownSelection";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/customhooks";
export default function Header() {
  const navigate = useNavigate();
  const shaking = useAppSelector((state) => state.header.cartShaking);
  const bounce = useAppSelector((state) => state.header.wishlistBounce);
  const isComparing = useAppSelector((state) => state.header.isComparing);

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const drowndownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(drowndownRef, () => {
    setOpenDropdown(false);
  });

  function goToPage(path: string) {
    navigate(`/${path}`);
  }

  function itemClicked(path: string) {
    setOpenDropdown(false);
    goToPage(path);
  }

  return (
    <header className="sticky top-0 flex justify-between px-25 py-4 border-b border-gray-200 bg-white shadow-xs z-30">
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
        <SearchBar isComparing={isComparing} />
      </div>

      {/* Right side */}
      <div className="flex items-center">
        {/* Whish list */}
        <div
          onClick={() => goToPage("wishlist")}
          className="relative mr-6 px-2 py-1.5 bg-transparent hover:bg-primary-light rounded-md cursor-pointer"
        >
          <FontAwesomeIcon icon={faHeart} bounce={bounce} id="wishlist" />
          <span className="absolute -right-1 -top-0.5 px-1.5 rounded-full bg-secondary text-white text-xs font-semibold">
            5
          </span>
        </div>
        {/* User */}
        <div
          onClick={() => setOpenDropdown((prev) => !prev)}
          className="relative mr-6 px-2 py-1.5 bg-transparent hover:bg-primary-light rounded-md cursor-pointer"
        >
          <FontAwesomeIcon icon={faUser} />
          <DropDownSelection
            ref={drowndownRef}
            itemClicked={itemClicked}
            openDropDown={openDropdown}
          />
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
