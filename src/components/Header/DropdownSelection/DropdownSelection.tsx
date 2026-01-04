import userAvatarImg from "@/assets/user_avatar.png";
import {
  faArrowRightFromBracket,
  faClockRotateLeft,
  faTruckFast,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

interface DropDownSelectionProps {
  openDropDown: boolean;
  itemClicked: (path: string) => void;
}

const DropDownSelection = forwardRef<
  HTMLDivElement | null,
  DropDownSelectionProps
>(({ itemClicked, openDropDown }, ref) => {
  return (
    <div
      ref={ref}
      data-open={openDropDown}
      className="data-[open=false]:hidden absolute top-full -left-14 p-3 bg-white shadow-lg rounded-lg w-60 h-fit"
    >
      {/* Info */}
      <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-lg mb-4">
        {/* Avatar */}
        <img
          src={userAvatarImg}
          alt="user avatar"
          className="size-8 rounded-full"
        />
        <div>
          <h2 className="text-sm font-medium">Minh Trung</h2>
          <h3 className="text-sm">trungbb8@gmail.com</h3>
        </div>
      </div>

      {/* Selection */}
      <ul className="flex flex-col gap-2 px-1">
        <li
          onClick={() => itemClicked("account")}
          className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-neutral-50"
        >
          <FontAwesomeIcon icon={faUser} size="sm" />
          <span className="font-medium text-base">Tài khoản</span>
        </li>

        <li
          onClick={() => itemClicked("orders")}
          className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-neutral-50"
        >
          <FontAwesomeIcon icon={faTruckFast} size="sm" />
          <span className="font-medium text-base">Đơn hàng</span>
        </li>

        <li
          onClick={() => itemClicked("view-history")}
          className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-neutral-50"
        >
          <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
          <span className="font-medium text-base">Lịch sử xem hàng</span>
        </li>

        <li className="h-0.5 bg-neutral-100"></li>
        <li className="flex items-center gap-2 rounded-lg p-1.5 text-red-600 hover:bg-neutral-50">
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="sm" />
          <span className="font-medium text-base">Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
});

export default DropDownSelection;
