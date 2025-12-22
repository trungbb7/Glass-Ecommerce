import Breadcrumb, {
  type BreadcrumbData,
} from "@/components/Breadcrumb/Breadcrumb";
import { Header } from "@/components/Header";
import {
  faArrowRotateLeft,
  faCartShopping,
  faHouse,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "@/assets/product_image_representation/1.jpg";
import img2 from "@/assets/product_image_representation/2.jpg";
import img3 from "@/assets/product_image_representation/3.jpg";
import img4 from "@/assets/product_image_representation/4.jpg";
import { Footer } from "@/components/Footer";
import { Rating } from "@/components/Rating";
import { Button } from "@/components/Button";
import { faHeart, faTruck } from "@fortawesome/free-regular-svg-icons";
import Review from "./Review/Review";

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

const product = {
  name: "KÍNH RÂM EYE PLUS TR855",
  rating: 5,
  numReviews: 150,
  inStock: true,
  stockPrice: 900000,
  finalPrice: 690000,
  briefDescription:
    "Kính râm TR855 C1 sở hữu thiết kế vuông bo góc hiện đại, mang đến vẻ ngoài cá tính nhưng không kém phần thanh lịch. Gọng kính làm từ chất liệu nhựa TR cứng cáp, chắc chắn, bền nhẹ và có thể nắn chỉnh linh hoạt. Điểm nhấn kim loại ở phần bản lề giúp tăng độ độc đáo cho tổng thể thiết kế.",
  variants: [
    {
      color: "#000000",
      quantity: 10,
    },
    { color: "#d67900", quantity: 14 },
  ],
};

export default function ProductDetail() {
  return (
    <div className="text-text1">
      <Header />

      <div className="px-30 py-20">
        {/* Top */}
        <div className="pt-4 pb-10">
          <Breadcrumb data={breadcrumbData} />
        </div>

        {/* Body */}
        <div className="flex gap-8 mb-10">
          {/* Product Images */}
          <div className="flex flex-col gap-4 grow-5 w-1/2">
            {/* Image representation */}
            <div>
              <img src={img1} alt="img" className="w-150 h-107 object-cover" />
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
              <p className="text-sm text-text2">(150 Đánh giá)</p>
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
            <div className="flex items-center gap-6">
              <span className="text-lg">Màu sắc:</span>
              <ul className="flex items-center gap-2">
                <li className="bg-black rounded-full size-5 shadow shadow-gray-200"></li>
                <li className="bg-green-400 rounded-full size-5 shadow shadow-gray-200"></li>
              </ul>
            </div>

            <div className="flex gap-4">
              <span>Còn lại:</span>
              <span className="font-medium">20</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity selection */}
              <div className="flex items-center">
                <button className="border-2 border-gray-300 p-2 rounded-l-md cursor-pointer hover:bg-gray-200">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <div className="font-medium border-y-2 border-gray-300 py-2 px-8">
                  1
                </div>
                <button className=" p-2.5 bg-secondary text-white rounded-r-md cursor-pointer hover:bg-secondary-500">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              {/*  */}
              <Button type="primary" className="py-2.5 px-8">
                Mua ngay
              </Button>
              <Button type="secondary" className="py-2.5 px-8">
                <FontAwesomeIcon icon={faCartShopping} /> Thêm vào giỏ hàng
              </Button>
              <Button type="secondary">
                <FontAwesomeIcon icon={faHeart} />
              </Button>
            </div>

            {/* Promotion */}
            <div className="flex flex-wrap flex-row gap-3 mt-4">
              <div className="grow w-1/2 flex gap-4 items-center p-3 border-2 border-gray-500">
                <FontAwesomeIcon
                  icon={faTruck}
                  size="lg"
                  className="font-medium"
                />
                <div>
                  <p className="font-medium text-lg">Miễn phí vẫn chuyển</p>
                  <p className="font-medium text-sm">
                    Miễn phí vận chuyển khắp cả nước
                  </p>
                </div>
              </div>

              <div className="grow w-1/2 flex gap-4 items-center p-3 border-2 border-gray-500">
                <FontAwesomeIcon
                  icon={faArrowRotateLeft}
                  size="lg"
                  className="font-medium"
                />
                <div>
                  <p className="font-medium text-lg">Hoàn trả miễn phí</p>
                  <p className="font-medium text-sm">
                    30 ngày hoàn trả miễn phí
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Top */}
          <div className="flex mb-10">
            {/* Description */}
            <div
              data-active="true"
              className="w-fit text-neutral-400 font-normal text-center text-lg p-4 border-b-4 border-b-neutral-400 cursor-pointer hover:text-secondary-200 data-[active=true]:font-medium data-[active=true]:text-secondary data-[active=true]:border-b-secondary-400"
            >
              Đặc tả
            </div>

            <div
              data-active="false"
              className="w-fit text-neutral-400 font-normal text-center text-lg p-4 border-b-4 border-b-neutral-400 cursor-pointer hover:text-secondary-200 data-[active=true]:font-medium data-[active=true]:text-secondary data-[active=true]:border-b-secondary-400"
            >
              Đánh giá
            </div>

            <div className="grow border-b-4 border-b-neutral-400"></div>
          </div>

          {/* Specification */}
          <div className="mt-8">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
                <span>Độ rộng tròng</span>
                <span>56mm</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
                <span>Độ dài gọng</span>
                <span>145mm</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
                <span>Độ dài cầu kính</span>
                <span>17mm</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
                <span>Thương hiệu</span>
                <span>Cartier</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
                <span>Xuất xứ</span>
                <span>Hàn Quốc</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
                <span>Phù hợp với</span>
                <span>Nam</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
                <span>Bảo hành</span>
                <span>1 năm</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
                <span>Chất liệu</span>
                <span>Nhựa</span>
              </li>
            </ul>
          </div>

          {/* Review */}
          <Review />
        </div>
      </div>
      <Footer />
    </div>
  );
}
