import productPlaceholderImage from "@/assets/product_placeholder.webp";
import { useAppSelector } from "@/hooks";
import type { Product } from "@/types/product";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CompareProductItem from "../CompareProductItem/CompareProductItem";

interface ComparisonSectionProps {
  product: Product | null;
  activeComparison: boolean;
  stopComparison: () => void;
}

export default function ComparisonSection({
  product,
  activeComparison,
  stopComparison,
}: ComparisonSectionProps) {
  const compareProduct = useAppSelector((state) => state.header.compareProduct);
  return (
    <div
      data-active={activeComparison}
      className="data-[active=false]:hidden fixed  w-full top-22 left-0 right-0 max-h-150 overflow-y-auto shadow z-21 bg-white/85 animate-dropdown "
    >
      <div className="relative flex flex-col gap-4 shadow items-center bg-white w-fit mx-auto rounded-3xl pt-4">
        {/* Close button */}
        <button
          onClick={stopComparison}
          className="absolute right-1 top-0 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"
        >
          <FontAwesomeIcon icon={faX} />
        </button>

        <h2 className="font-medium text-3xl">So sánh sản phẩm</h2>
        <div className="mx-auto max-w-250 min-w-200  py-4 rounded-2xl">
          {/* Top */}
          <div>
            {/* Images */}
            <div className="flex items-center justify-around mb-6">
              <img
                className="size-50 shadow rounded-2xl"
                src="https://i.ibb.co/Y4MCy3zn/9078-c4.jpg"
                alt="product image1"
              />
              <img
                className="size-50 shadow rounded-2xl"
                src={
                  compareProduct
                    ? compareProduct.images[0]
                    : productPlaceholderImage
                }
                alt="product image2"
              />
            </div>
            {/* Titile */}
            <div className="flex items-center mb-4 px-1">
              <p className="flex-4 text-xl font-medium text-center">
                {product?.name}
              </p>
              <p className="flex-1 text-center font-medium text-3xl">VS</p>
              <p className="flex-4 text-xl font-medium text-center">
                {compareProduct ? compareProduct.name : ""}
              </p>
            </div>

            <div className="w-full h-1 bg-slate-700"></div>

            {/* Specification */}
            <ul className="flex flex-col gap-1">
              <CompareProductItem
                title={"Độ rộng tròng"}
                leftItem={`${product?.specification.lensWidth}mm`}
                rightItem={
                  compareProduct
                    ? `${compareProduct.specification.lensWidth}mm`
                    : ""
                }
              />

              <CompareProductItem
                title={"Độ dài gọng"}
                leftItem={`${product?.specification.templeLength}mm`}
                rightItem={
                  compareProduct
                    ? `${compareProduct.specification.templeLength}mm`
                    : ""
                }
              />

              <CompareProductItem
                title={"Độ dài cầu kính"}
                leftItem={`${product?.specification.bridgeWidth}mm`}
                rightItem={
                  compareProduct
                    ? `${compareProduct.specification.bridgeWidth}mm`
                    : ""
                }
              />

              <CompareProductItem
                title={"Thương hiệu"}
                leftItem={product?.specification.brand || ""}
                rightItem={compareProduct?.specification.brand || ""}
              />

              <CompareProductItem
                title={"Xuất xứ"}
                leftItem={product?.specification.origin || ""}
                rightItem={compareProduct?.specification.origin || ""}
              />

              <CompareProductItem
                title={"Chất liệu"}
                leftItem={product?.specification.material || ""}
                rightItem={compareProduct?.specification.material || ""}
              />

              <CompareProductItem
                title={"Phong cách"}
                leftItem={product?.specification.style || ""}
                rightItem={compareProduct?.specification.style || ""}
              />

              <CompareProductItem
                title={"Bảo hành"}
                leftItem={product?.specification.warranty || ""}
                rightItem={compareProduct?.specification.warranty || ""}
              />
            </ul>
            <div className="w-full h-1 bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
