import Breadcrumb, {
  type BreadcrumbData,
} from "@/components/Breadcrumb/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductItem from "@/components/ProductItem/ProductItem";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { getViewHistoryProducts } from "@/utils/viewHistoryUtils";

const breadcrumbData: BreadcrumbData[] = [
  { name: "Trang chủ", path: "/", icon: <FontAwesomeIcon icon={faHouse} /> },
  {
    name: "Lịch sử xem hàng",
    path: "/view-history",
  },
];

export default function ViewHistory() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    function fetchViewHistory() {
      const productList = getViewHistoryProducts();
      setProducts(productList);
    }

    fetchViewHistory();
  }, []);

  return (
    <div className="text-text1">
      <Header />

      <div className="px-30 mb-70">
        {/* Top */}
        <div className="pt-4 pb-10">
          <Breadcrumb data={breadcrumbData} />
        </div>

        {/* Body */}
        <div className="flex ">
          {/* Content */}
          <div className="w-full flex flex-col gap-4 px-8 pb-4">
            <div className="flex flex-wrap gap-4 mb-8">
              {products.length === 0 && (
                <p className="w-full mb-40 mt-20 text-center">
                  Không có sản phẩm nào
                </p>
              )}
              {products.map((product) => (
                <ProductItem
                  id={product.id}
                  img={product.images[0]}
                  discountPercent={Math.round(
                    (1 - product.finalPrice / product.stockPrice) * 100,
                  )}
                  finalPrice={product.finalPrice}
                  name={product.name}
                  stockPrice={product.stockPrice}
                  colors={product.variants.map((item) => item.color)}
                  isWishList={true}
                  key={product.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
