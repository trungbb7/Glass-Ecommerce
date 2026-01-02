import aboutUsImage1 from "@/assets/about_us_1.jpg";
import Breadcrumb, {
  type BreadcrumbData,
} from "@/components/Breadcrumb/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  faBagShopping,
  faDollarSign,
  faHouse,
  faSackDollar,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const breadcrumbData: BreadcrumbData[] = [
  { name: "Trang chủ", path: "/", icon: <FontAwesomeIcon icon={faHouse} /> },
  {
    name: "Giới thiệu",
    path: "/about-us",
  },
];
export default function AboutUs() {
  return (
    <div className="text-text1">
      <Header />

      {/* Body */}
      <div className="mt-10 mb-30 px-30">
        {/* Breadcrum */}
        <div className="pt-4 pb-10">
          <Breadcrumb data={breadcrumbData} />
        </div>

        {/* Our story */}
        <div className="flex items-center gap-10">
          {/* Left side */}
          <div className="flex-5 flex flex-col justify-center items-start">
            <h1 className="font-semibold text-4xl text-black mb-8">
              Về chúng tôi
            </h1>
            <p className="mb-4">
              Chúng tôi có hai ước mơ khi bắt đầu hành trình với Glasses Hub.
              Thứ nhất, đó là chứng minh mình có thể độc lập xây dựng sự nghiệp.
              Thứ hai, đó là tự thân thiết kế nên một chiếc kính đáp ứng toàn
              diện những mong mỏi của chính mình - một người bị cận thị lâu năm.
              Tôi hiểu người mắc tật khúc xạ khao khát sở hữu một chiếc kính hội
              tụ đủ 3 yếu tố: Đáp ứng công năng - Chất lượng đo cắt ổn định -
              Mẫu mã thời trang hợp mode. Tôi cũng hiểu khách hàng khát khao cảm
              giác được trân trọng, yên tâm và tin tưởng xuyên suốt hành trình
              trải nghiệm. Tôi xác định thương hiệu của mình phải từng bước thỏa
              mãn được những mong muốn cấp thiết đó, đồng thời, góp phần nâng
              cao tiêu chuẩn chăm sóc đôi mắt cho cộng đồng
            </p>
            <p className="">
              Bước đầu tiên để nâng cao tiêu chuẩn là giúp cộng đồng tìm được
              một chiếc kính chuẩn toàn diện: Chuẩn với vấn đề thị lực - Chuẩn
              gu với phong cách yêu thích - Chuẩn giá trị. Tôi muốn tạo ra một
              điểm đến đáng tin cậy để cộng đồng mắc tật khúc xạ có được trải
              nghiệm tiêu chuẩn, sở hữu một chiếc kính tiêu chuẩn phù hợp với
              nhu cầu riêng biệt của mỗi người.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-5">
            <img
              src={aboutUsImage1}
              alt="about us image"
              className="size-full"
            />
          </div>
        </div>

        {/* Statistics */}
        <ul className="flex items-center gap-8 justify-center mt-20">
          <li className="group flex flex-col gap-2 items-center justify-center size-55 p-2 border border-gray-300 rounded-lg shadow  cursor-pointer hover:bg-secondary hover:text-white">
            <div className="size-16 flex items-center justify-center p-2 rounded-full bg-black text-white border-8 border-slate-300 group-hover:text-black group-hover:bg-white">
              <FontAwesomeIcon icon={faStore} size={"lg"} />
            </div>
            <span className="text-center font-medium text-2xl">99</span>
            <span className="text-center text-sm font-medium">
              Chi nhánh hoạt động
            </span>
          </li>

          <li className="group flex flex-col gap-2 items-center justify-center size-55 p-2 border border-gray-300 rounded-lg shadow  cursor-pointer hover:bg-secondary hover:text-white">
            <div className="size-16 flex items-center justify-center p-2 rounded-full bg-black text-white border-8 border-slate-300 group-hover:text-black group-hover:bg-white">
              <FontAwesomeIcon icon={faDollarSign} size={"lg"} />
            </div>
            <span className="text-center font-medium text-2xl">10.5K</span>
            <span className="text-center text-sm font-medium">
              Sản phẩm bán được hàng tháng
            </span>
          </li>

          <li className="group flex flex-col gap-2 items-center justify-center size-55 p-2 border border-gray-300 rounded-lg shadow  cursor-pointer hover:bg-secondary hover:text-white">
            <div className="size-16 flex items-center justify-center p-2 rounded-full bg-black text-white border-8 border-slate-300 group-hover:text-black group-hover:bg-white">
              <FontAwesomeIcon icon={faBagShopping} size={"lg"} />
            </div>
            <span className="text-center font-medium text-2xl">1K</span>
            <span className="text-center text-sm font-medium">
              Khách hàng thân thiết
            </span>
          </li>

          <li className="group flex flex-col gap-2 items-center justify-center size-55 p-2 border border-gray-300 rounded-lg shadow  cursor-pointer hover:bg-secondary hover:text-white">
            <div className="size-16 flex items-center justify-center p-2 rounded-full bg-black text-white border-8 border-slate-300 group-hover:text-black group-hover:bg-white">
              <FontAwesomeIcon icon={faSackDollar} size={"lg"} />
            </div>
            <span className="text-center font-medium text-2xl">1B</span>
            <span className="text-center text-sm font-medium">
              Tổng doanh thu
            </span>
          </li>
        </ul>
        <div></div>
      </div>

      <Footer />
    </div>
  );
}
