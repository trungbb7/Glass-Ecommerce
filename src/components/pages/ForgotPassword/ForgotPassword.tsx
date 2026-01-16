import posterImg from "@/assets/poster.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [sentEmail, setSentEmail] = useState<boolean>(false);

  return (
    <div className="flex bg-[#F8F8F8]">
      {/* Left */}
      {!sentEmail ? (
        <div className="w-1/2 flex flex-col items-center justify-center">
          <p className="text-5xl font-semibold mb-4">Đặt lại mật khẩu</p>
          <p className="text-text2 font-medium mb-20">
            Nhập địa chỉ email đã đăng ký để đặt lại mật khẩu
          </p>
          <form className="flex flex-col items-start w-100">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              className="text-text2 px-2 py-2 mb-6 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 outline-gray-400"
            />

            <button
              onClick={() => setSentEmail(true)}
              className="self-center w-full py-3 mb-4 text-white font-medium rounded-2xl bg-secondary-300 hover:bg-secondary cursor-pointer"
            >
              Tiếp tục
            </button>
            <div className="self-center text-sm font-medium text-text2">
              Quay lại{" "}
              <Link to="/login">
                <span className="text-secondary cursor-pointer hover:text-secondary-500">
                  Đăng nhập
                </span>
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-1/2 flex flex-col items-center justify-center">
          <p className="text-5xl font-semibold mb-4">
            Email khôi phục đã được gửi
          </p>
          <p className="text-text2 font-medium mb-20">
            Vui lòng kiểm tra email để thực hiện quy trình khôi phục mật khẩu
            của bạn
          </p>
          <div className="self-center text-sm font-medium text-text2">
            Quay lại{" "}
            <Link to="/login">
              <span className="text-secondary cursor-pointer hover:text-secondary-500">
                Đăng nhập
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Right */}
      <div className="w-1/2">
        <img
          className="w-full h-screen object-cover"
          src={posterImg}
          alt="poster"
        />
      </div>
    </div>
  );
}
