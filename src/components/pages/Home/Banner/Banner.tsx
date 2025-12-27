import banner from "@/assets/banner_img.jpg";
import { Button } from "@/components/Button";

export default function Banner() {
  return (
    <div className="px-20 flex">
      {/* Left side */}
      <div className="grow-9 pt-10">
        <div className="text-3xl font-bold mb-2">Sun</div>
        <div className="text-3xl font-bold mb-4">Glasses</div>
        <div className="flex gap-2">
          <Button type="primary">Mua ngay</Button>
          <Button type="secondary">Xem thêm</Button>
        </div>
      </div>
      {/* Right side */}
      <div className="grow">
        <img src={banner} alt="" className="h-60 w-60" />
      </div>
    </div>
  );
}
