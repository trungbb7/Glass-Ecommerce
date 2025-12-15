import posterImg from "@/assets/poster.png";

export default function Login() {
  return (
    <div className="flex bg-[#F8F8F8]">
      {/* Left */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <p className="text-5xl font-semibold mb-4">Đăng nhập</p>
        <p className="text-text2 font-medium mb-20">
          Chào mừng bạn trở lại! Vui lòng điền thông tin của bản
        </p>
        <form className="flex flex-col items-start w-100">
          <label className="block font-medium mb-3" htmlFor="username">
            Tên đăng nhập
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Vui lòng điền tên đăng nhập"
            className="text-text2 px-2 py-2 mb-6 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 outline-gray-400"
          />

          <label className="block font-medium mb-3" htmlFor="password">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Vui lòng điền mật khẩu"
            className="text-text2 px-2 py-2 mb-6 bg-white border border-gray-300 rounded-lg w-full shadow shadow-gray-200 outline-gray-400"
          />

          <div className="self-end font-medium text-sm text-text1 hover:text-secondary cursor-pointer mb-4">
            Quên mật khẩu
          </div>

          <button className="self-center w-full py-3 mb-4 text-white font-medium rounded-2xl bg-secondary-300 hover:bg-secondary cursor-pointer">
            Đăng nhập
          </button>
          <div className="self-center text-sm font-medium text-text2">
            Chưa có tài khoản?{" "}
            <span className="text-secondary cursor-pointer hover:text-secondary-500">
              Đăng ký
            </span>
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
