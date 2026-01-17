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
import type { Filter } from "@/types/filter";
import { useLocation, useSearchParams } from "react-router-dom";

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

export interface ParamItem {
  key: string;
  value: string;
}

const limit = 15;

export default function Products() {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams({
    _page: "1",
    _limit: `${limit}`,
  });

  const currentPageInit = parseInt(searchParams.get("_page") || "1");

  const [selectingSort, setSelectingSort] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>("none");
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(currentPageInit);

  function updateFilter(items: { key: string; value: string }[]) {
    const newParams = new URLSearchParams(searchParams);
    for (const item of items) {
      newParams.set(item.key, item.value);
    }
    newParams.set("_page", "1");
    newParams.set("_limit", `${limit}`);
    setSearchParams(newParams);
    setCurrentPage(1);
  }

  function toggleSelectingSort() {
    setSelectingSort(!selectingSort);
  }

  function changeNumPage(page: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("_page", `${page}`);
    setSearchParams(newParams);
    setCurrentPage(page);
  }

  useEffect(() => {
    async function fetchAllProducts() {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(
        `http://localhost:3000/products?${queryString}`,
      );

      const totalCountStr = response.headers.get("x-total-count");
      if (totalCountStr) {
        setTotalCount(parseInt(totalCountStr));
        setNumPages(Math.ceil(parseInt(totalCountStr) / limit));
      }

      const productsObject = await response.json();
      setProducts(productsObject);
    }

    fetchAllProducts();
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    async function fetchFilters() {
      const response = await fetch("http://localhost:3000/filters");
      const filterObject = await response.json();
      setFilters(filterObject);
    }

    fetchFilters();
  }, []);

  useEffect(() => {
    function resetState() {
      setSelectingSort(false);
      setSortType("none");
      setCurrentPage(1);
      setSearchParams({
        _page: "1",
        _limit: `${limit}`,
      });
    }

    if (location.search === "") {
      resetState();
    }
  }, [location, setSearchParams]);

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
            {filters.map((filter) => (
              <SidebarSelector
                updateFilter={updateFilter}
                data={filter}
                key={filter.name}
              />
            ))}
          </div>
          {/* Content */}
          <div className="w-3/4 flex flex-col gap-4 px-8 pb-4">
            {/* head */}
            <div className="flex justify-between items-center">
              <div className="font-medium">
                {totalCount === 0 ? 0 : (currentPage - 1) * limit + 1} -{" "}
                {Math.min(currentPage * limit, totalCount)} của {totalCount} sản
                phẩm
              </div>
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
                      updateFilter([
                        { key: "_sort", value: "finalPrice" },
                        { key: "_order", value: "asc" },
                      ]);

                      setSortType("priceAsc");
                      setSelectingSort(false);
                    }}
                    className="border border-gray-200 px-2 p-1 hover:bg-neutral-200 cursor-pointer"
                  >
                    Giá tăng dần
                  </li>
                  <li
                    onClick={() => {
                      updateFilter([
                        { key: "_sort", value: "finalPrice" },
                        { key: "_order", value: "desc" },
                      ]);

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
                  key={product.id}
                />
              ))}
            </div>

            {totalCount !== 0 && (
              <Pagination
                numPages={numPages}
                changeNumPage={changeNumPage}
                className="self-center"
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
