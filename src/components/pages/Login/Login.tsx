import posterImg from "@/assets/poster.png";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  function toggleHidePassword() {
    setHidePassword((prev) => !prev);
  }

  return (
    <div className="flex bg-[#F8F8F8]">
      {/* Left */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <p className="text-5xl font-semibold mb-4">Đăng nhập</p>
        <p className="text-text2 font-medium mb-20">
          Chào mừng bạn trở lại! Vui lòng điền thông tin của bản
        </p>
        <form className="flex flex-col items-start w-100">
          <label className="block font-medium mb-3" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Vui lòng điền tên Email"
            className="text-text2 px-2 py-2 mb-6 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 outline-gray-400"
          />

          <label className="block font-medium mb-3" htmlFor="password">
            Mật khẩu
          </label>
          <div className="flex gap-1 items-center text-text2 px-2 py-2 mb-6 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 has-focus:border-gray-400">
            <input
              type={hidePassword ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Vui lòng điền mật khẩu"
              className="grow outline-0"
            />

            {hidePassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="cursor-pointer"
                onClick={toggleHidePassword}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                className="cursor-pointer"
                onClick={toggleHidePassword}
              />
            )}
          </div>

          <div className="self-end font-medium text-sm text-text1 hover:text-secondary cursor-pointer mb-4">
            Quên mật khẩu
          </div>

          <button className="self-center w-full py-3 mb-4 text-white font-medium rounded-2xl bg-secondary-300 hover:bg-secondary cursor-pointer">
            Đăng nhập
          </button>
          <div className="self-center text-sm font-medium text-text2">
            Chưa có tài khoản?{" "}
            <Link to="/register">
              <span className="text-secondary cursor-pointer hover:text-secondary-500">
                Đăng ký
              </span>
            </Link>
          </div>
        </form>
      </div>
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
