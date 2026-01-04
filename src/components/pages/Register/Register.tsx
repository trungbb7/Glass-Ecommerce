import posterImg from "@/assets/poster.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideRetypePassword, setHideRetypePassword] = useState<boolean>(true);

  function toggleHideRetypePassword() {
    setHideRetypePassword((prev) => !prev);
  }

  function toggleHidePassword() {
    setHidePassword((prev) => !prev);
  }

  return (
    <div className="flex bg-[#F8F8F8]">
      {/* Left */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <p className="text-5xl font-semibold mb-4">Đăng ký</p>
        <p className="text-text2 font-medium mb-6">
          Đăng ký để sử dụng tính đầy đủ tính năng
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
            className="text-text2 px-2 py-2 mb-3 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 outline-gray-400"
          />

          <label className="block font-medium mb-3" htmlFor="name">
            Họ tên
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Vui lòng diền đầy đủ họ tên"
            className="text-text2 px-2 py-2 mb-3 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 outline-gray-400"
          />

          <label className="block font-medium mb-3" htmlFor="address">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Vui lòng điền địa chỉ"
            className="text-text2 px-2 py-2 mb-3 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 outline-gray-400"
          />

          <label className="block font-medium mb-3" htmlFor="tel">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="tel"
            id="tel"
            placeholder="Vui lòng điền số điện thoại"
            className="text-text2 px-2 py-2 mb-3 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 outline-gray-400"
          />

          <label className="block font-medium mb-3" htmlFor="password">
            Mật khẩu
          </label>
          <div className="flex gap-1 items-center text-text2 px-2 py-2 mb-3 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 has-focus:border-gray-400">
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

          <label className="block font-medium mb-3" htmlFor="retype-password">
            Nhập lại mật khẩu
          </label>
          <div className="flex gap-1 items-center text-text2 px-2 py-2 mb-3 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 has-focus:border-gray-400">
            <input
              type={hideRetypePassword ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Vui lòng điền lại mật khẩu"
              className="grow outline-0"
            />

            {hideRetypePassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="cursor-pointer"
                onClick={toggleHideRetypePassword}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                className="cursor-pointer"
                onClick={toggleHideRetypePassword}
              />
            )}
          </div>

          {/* <div className="self-end font-medium text-sm text-text1 hover:text-secondary cursor-pointer mb-4">
            Quên mật khẩu
          </div> */}

          <button className="self-center w-full py-3 mb-4 mt-4 text-white font-medium rounded-2xl bg-secondary-300 hover:bg-secondary cursor-pointer">
            Đăng ký
          </button>
          <div className="self-center text-sm font-medium text-text2">
            Đã có tài khoản?{" "}
            <Link to="/login">
              <span className="text-secondary cursor-pointer hover:text-secondary-500">
                Đăng nhập
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
