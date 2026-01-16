import banner from "@/assets/banner_img.jpg";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";

interface BannerProps {
  scrollFunction: () => void;
}

export default function Banner({ scrollFunction }: BannerProps) {
  const navigate = useNavigate();
  return (
    <div className="px-20 min-h-140 flex items-center">
      {/* Left side */}
      <div className="flex flex-col gap-6 grow-9 pt-10">
        <div className="text-5xl font-bold ">Tầm nhìn mới</div>
        <div className="text-5xl font-bold mb-4">Phong cách riêng</div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              navigate("/product");
            }}
            type="primary"
          >
            Khám phá
          </Button>
          <Button
            onClick={() => {
              scrollFunction();
            }}
            type="secondary"
          >
            Xem thêm
          </Button>
        </div>
      </div>
      {/* Right side */}
      <div className="grow">
        <img src={banner} alt="" className="size-120" />
      </div>
    </div>
  );
}
