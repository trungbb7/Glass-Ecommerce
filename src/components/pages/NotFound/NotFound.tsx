import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-8 items-center justify-center h-screen">
        <p className="text-5xl font-bold">404 Không Tìm Thấy Trang</p>
        <p className="font-medium text-text1">
          Trang bạn truy cập không tồn tại. Bạn có thể trở về trang chủ
        </p>
        <Button
          onClick={() => {
            navigate("/");
          }}
          text="Trở về trang chủ"
          type="primary"
        />
      </div>
      <Footer />
    </div>
  );
}
