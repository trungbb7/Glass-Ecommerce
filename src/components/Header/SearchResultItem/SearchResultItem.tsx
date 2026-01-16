import { useAppDispatch, useAppSelector } from "@/hooks";
import type { Product } from "@/types/product";
import { useNavigate } from "react-router-dom";
import { setCompareProduct } from "../headerSlice";

interface SearchResultItemProps {
  product: Product;
  closeSearchResult: () => void;
}

export default function SearchResultItem({
  product,
  closeSearchResult,
}: SearchResultItemProps) {
  const navigate = useNavigate();
  const isComparing = useAppSelector((state) => state.header.isComparing);
  const dispatch = useAppDispatch();

  return (
    <li
      onClick={() => {
        if (isComparing) {
          dispatch(setCompareProduct(product));
        } else {
          navigate(`/product/${encodeURIComponent(product.id)}`);
        }
        closeSearchResult();
      }}
      className="flex gap-4 items-center px-4 py-2 rounded-2xl hover:bg-neutral-200 cursor-pointer z-30"
    >
      <img
        src={product.images[0]}
        alt="product image"
        className="size-15 rounded-full"
      />
      <div>
        <p className="font-medium hover:underline">{product.name}</p>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-secondary font-medium">
            {product.finalPrice} VNĐ
          </span>
          <span className="text-sm text-neutral-400 font-medium line-through">
            {product.stockPrice} VNĐ
          </span>
        </div>
      </div>
    </li>
  );
}
