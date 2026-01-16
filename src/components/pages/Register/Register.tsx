import posterImg from "@/assets/poster.png";
import {
  closeNotification,
  pushNotification,
} from "@/components/Notification/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideRetypePassword, setHideRetypePassword] = useState<boolean>(true);

  const show = useAppSelector((state) => state.notification.show);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function toggleHideRetypePassword() {
    setHideRetypePassword((prev) => !prev);
  }

  function toggleHidePassword() {
    setHidePassword((prev) => !prev);
  }

  async function handleSubmitRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email && fullName && address && tel && password && retypePassword) {
      if (password.length < 4) {
        setErrorMessage("Mật khẩu phải chứa ít nhất 4 ký tự");
        return;
      }
      if (password !== retypePassword) {
        setErrorMessage("Mật khẩu nhập lại không đúng");
        return;
      }

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullName,
          address,
          tel,
          password,
        }),
      });

      if (response.ok) {
        dispatch(
          pushNotification({
            type: "success",
            title: "Chúc mừng",
            message: "Đăng ký thành công",
          }),
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (response.status === 400) {
        const resonseObj = await response.json();
        dispatch(
          pushNotification({
            type: "error",
            title: "Opps",
            message: resonseObj.error,
          }),
        );
      } else {
        dispatch(
          pushNotification({
            type: "error",
            title: "Opps",
            message: "Đã xảy ra lỗi",
          }),
        );
      }
    }
  }

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        dispatch(closeNotification());
      }, 1500);
    }
  }, [show, dispatch]);

  return (
    <div className="flex bg-[#F8F8F8]">
      {/* Left */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <p className="text-5xl font-semibold mb-4">Đăng ký</p>
        <p className="text-text2 font-medium mb-6">
          Đăng ký để sử dụng tính đầy đủ tính năng
        </p>
        <p className="text-red-600">{errorMessage}</p>
        <form
          onSubmit={handleSubmitRegister}
          className="flex flex-col items-start w-100"
        >
          <label className="block font-medium mb-3" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Vui lòng điền tên Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            required
            value={tel}
            onChange={(e) => setTel(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              name="retypepassword"
              id="retypepassword"
              placeholder="Vui lòng điền lại mật khẩu"
              required
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
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
