import Breadcrumb, {
  type BreadcrumbData,
} from "@/components/Breadcrumb/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarSelector from "./SidebarSelector/SidebarSelector";
import ProductItem from "@/components/ProductItem/ProductItem";
import { Pagination } from "@/components/Pagination";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

const breadcrumbData: BreadcrumbData[] = [
  { name: "Trang chủ", path: "/", icon: <FontAwesomeIcon icon={faHouse} /> },
  {
    name: "Sản phẩm",
    path: "/products",
  },
];

type SortType = "none" | "priceAsc" | "priceDesc";

const sortTypeMap = {
  none: "Sắp xếp",
  priceAsc: "Giá tăng dần",
  priceDesc: "Giá giảm dần",
};

export default function Products() {
  const [selectingSort, setSelectingSort] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>("none");
  const [products, setProducts] = useState<Product[]>([]);

  function toggleSelectingSort() {
    setSelectingSort(!selectingSort);
  }

  useEffect(() => {
    async function fetchAllProducts() {
      const response = await fetch("http://127.0.0.1:3000/products");
      const productsObject = await response.json();
      console.log(productsObject);
      setProducts(productsObject);
    }

    fetchAllProducts();
  }, []);

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
          <div className="w-3/4 flex flex-col gap-4 px-8 pb-4">
            {/* head */}
            <div className="flex justify-end">
              <div className="relative">
                <div
                  onClick={toggleSelectingSort}
                  className="flex justify-between items-center px-3 py-2 border border-gray-300 w-60 select-none cursor-pointer hover:bg-neutral-50"
                >
                  <span className="font-medium">{sortTypeMap[sortType]}</span>
                  {selectingSort ? (
                    <FontAwesomeIcon icon={faAngleUp} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                  )}
                </div>
                <ul
                  className={`absolute z-100 w-full bg-white shadow ${!selectingSort && "hidden"}`}
                >
                  <li
                    onClick={() => {
                      setSortType("priceAsc");
                      setSelectingSort(false);
                    }}
                    className="border border-gray-200 px-2 p-1 hover:bg-neutral-200 cursor-pointer"
                  >
                    Giá tăng dần
                  </li>
                  <li
                    onClick={() => {
                      setSortType("priceDesc");
                      setSelectingSort(false);
                    }}
                    className="border border-gray-200 px-2 p-1 hover:bg-neutral-200 cursor-pointer"
                  >
                    Giá giảm dần
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {products.map((product) => (
                <ProductItem
                  img={product.images[0]}
                  discountPercent={
                    Math.round(
                      product.variants[0].finalPrice /
                        product.variants[0].stockPrice,
                    ) * 100
                  }
                  discountPrice={product.variants[0].finalPrice}
                  name={product.name}
                  stockPrice={product.variants[0].stockPrice}
                  key={product.id}
                />
              ))}
            </div>

            <Pagination className="self-center" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
