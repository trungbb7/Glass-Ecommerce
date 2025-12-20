import Breadcrumb, {
  type BreadcrumbData,
} from "@/components/Breadcrumb/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarSelector from "./SidebarSelector/SidebarSelector";
import ProductItem from "@/components/ProductItem/ProductItem";
import productImg1 from "@/assets/product_img1.jpg";
import { Pagination } from "@/components/Pagination";

const breadcrumbData: BreadcrumbData[] = [
  { name: "Trang chủ", path: "/", icon: <FontAwesomeIcon icon={faHouse} /> },
  {
    name: "Sản phẩm",
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
          <div className="w-1/4 shrink-0 flex flex-col gap-4 pr-4">
            <SidebarSelector />
            <SidebarSelector />
            <SidebarSelector />
          </div>
          {/* Content */}
          <div className="w-3/4 flex flex-col px-8 pb-4">
            <div className="flex flex-wrap gap-4 mb-8">
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />

              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
              <ProductItem
                img={productImg1}
                discountPercent={40}
                name="Kính Mát MN1268"
                discountPrice={420000}
                stockPrice={500000}
              />
            </div>

            <Pagination className="self-center" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
