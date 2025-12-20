import Breadcrumb, {
  type BreadcrumbData,
} from "@/components/Breadcrumb/Breadcrumb";
import { Header } from "@/components/Header";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "@/assets/product_image_representation/1.jpg";
import img2 from "@/assets/product_image_representation/2.jpg";
import img3 from "@/assets/product_image_representation/3.jpg";
import img4 from "@/assets/product_image_representation/4.jpg";
import { Footer } from "@/components/Footer";
import { Rating } from "@/components/Rating";

const breadcrumbData: BreadcrumbData[] = [
  { name: "Trang chủ", path: "/", icon: <FontAwesomeIcon icon={faHouse} /> },
  {
    name: "Sản phẩm",
    path: "/products",
  },
  {
    name: "EYE PLUS TR855",
    path: "/products/tr855",
  },
];

// const imgList = [img1, img2, img3, img4];

export default function ProductDetail() {
  return (
    <div className="text-text1">
      <Header />

      <div className="px-30">
        {/* Top */}
        <div className="pt-4 pb-10">
          <Breadcrumb data={breadcrumbData} />
        </div>

        {/* Body */}
        <div className="flex gap-4">
          {/* Product Images */}
          <div className="flex flex-col gap-4 grow-5 w-1/2">
            {/* Image representation */}
            <div>
              <img src={img1} alt="img" className="w-150 h-120 object-cover" />
            </div>
            {/* Image list */}
            <ul className="flex gap-2">
              <li>
                <img src={img1} alt="img" className="size-36 object-cover" />
              </li>
              <li>
                <img src={img2} alt="img" className="size-36 object-cover" />
              </li>
              <li>
                <img src={img3} alt="img" className="size-36 object-cover" />
              </li>
              <li>
                <img src={img4} alt="img" className="size-36 object-cover" />
              </li>
            </ul>
            <div></div>
          </div>

          <div className="grow-5 w-1/2 flex flex-col gap-4 ">
            {/* Product name */}
            <p className="text-2xl font-semibold">KÍNH RÂM EYE PLUS TR855</p>
            <div className="flex items-center gap-4">
              {/* Rating */}
              <Rating size="sm" rating={5} />
              <p className="text-sm text-text2 font-medium">(150 Đánh giá)</p>
              <div className="w-0.5 bg-text2 h-4"></div>
              <p className="text-green-400 text-sm font-medium">Còn hàng</p>
            </div>
            {/* Price */}
            <div className="flex items-center gap-4">
              {/* current */}
              <p className="text-text1 text-lg font-medium">690.000 VNĐ</p>
              {/* stock */}
              <p className="text-text2 text-lg font-medium line-through">
                900.000 VNĐ
              </p>
            </div>

            {/* Brief Descripion */}
            <p className="font-medium text-sm text-text2">
              Kính râm TR855 C1 sở hữu thiết kế vuông bo góc hiện đại, mang đến
              vẻ ngoài cá tính nhưng không kém phần thanh lịch. Gọng kính làm từ
              chất liệu nhựa TR cứng cáp, chắc chắn, bền nhẹ và có thể nắn chỉnh
              linh hoạt. Điểm nhấn kim loại ở phần bản lề giúp tăng độ độc đáo
              cho tổng thể thiết kế.
            </p>

            <div className="h-px bg-text2 mt-4"></div>

            {/* Colors */}
            <div>
              <span>Màu sắc</span>
            </div>
          </div>
          {/* Operation */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
