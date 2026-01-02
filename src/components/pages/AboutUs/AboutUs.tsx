import Breadcrumb, {
  type BreadcrumbData,
} from "@/components/Breadcrumb/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
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
      </div>

      <Footer />
    </div>
  );
}
