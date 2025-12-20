import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <div className="flex justify-around px-20 py-15 bg-black text-white">
      <div className="">
        <div className="text-white font-medium mb-6">
          <FontAwesomeIcon
            icon={faGlasses}
            className="text-secondary mr-2"
            size="2xl"
          />
          <span>GlassHub</span>
        </div>
        <p>Binh Chau TP.HCM</p>
        <div className="h-0.5 bg-white mb-20"></div>

        <ul className="flex gap-2">
          <li>
            <FontAwesomeIcon icon={faFacebookF} />
          </li>
          <li>
            <FontAwesomeIcon icon={faInstagram} />
          </li>
          <li>
            <FontAwesomeIcon icon={faXTwitter} />
          </li>
        </ul>
      </div>

      <div className="">
        <p className="text-white font-medium mb-6">Tài khoản</p>
        <ul className="flex flex-col gap-2 text-white">
          <li>Tài khoản của tôi</li>
          <li>Đăng nhập/Đăng ký</li>
          <li>Giỏ hàng</li>
          <li>Danh sách yêu thích</li>
          <li>Sản phẩm</li>
        </ul>
      </div>

      <div className="">
        <p className="text-white font-medium mb-6">Trợ giúp</p>
        <ul className="flex flex-col gap-2 text-white">
          <li>Về chúng tôi</li>
          <li>Liên hệ chúng tôi</li>
          <li>Chính sách hoàn trả</li>
          <li>Chính sách quyền riêng tư</li>
          <li>Chính sách thanh toán</li>
        </ul>
      </div>

      <div className="">
        <p className="text-white font-medium mb-6">Danh mục</p>
        <ul className="flex flex-col gap-2 text-white">
          <li>Kính mát cho nam</li>
          <li>Kính mát cho nữ</li>
          <li>Kính mát cho trẻ em</li>
          <li>Kính mát kim loại</li>
          <li>Kính mát nhựa</li>
        </ul>
      </div>
    </div>
  );
}
