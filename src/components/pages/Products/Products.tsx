import Breadcrumb, {
  type BreadcrumbData,
} from "@/components/Breadcrumb/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarSelector from "./SidebarSelector/SidebarSelector";

const breadcrumbData: BreadcrumbData[] = [
  { name: "Home", path: "/", icon: <FontAwesomeIcon icon={faHouse} /> },
  {
    name: "Products",
    path: "/products",
  },
];

export default function Products() {
  return (
    <div className="text-text1">
      <Header />

      <div className="px-30">
        {/* Top */}
        <div className="pt-4 pb-10">
          <Breadcrumb data={breadcrumbData} />
        </div>

        {/* Body */}
        <div className="flex ">
          {/* Sidebar */}
          <div className="grow-2 flex flex-col gap-4 pr-4">
            <SidebarSelector />
            <SidebarSelector />
            <SidebarSelector />
          </div>
          {/* Content */}
          <div className="grow-16 bg-gray-100"></div>
        </div>
        {/* Place holder */}
        <div className="h-160"></div>
      </div>
      <Footer />
    </div>
  );
}
