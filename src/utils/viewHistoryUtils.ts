import type { Product } from "@/types/product";

export function addViewHistoryProduct(product: Product) {
  const historyString = localStorage.getItem("view-history") || "[]";
  let productList = JSON.parse(historyString) as Product[];
  productList = productList.filter((item) => item.id !== product.id);
  productList.unshift(product);
  localStorage.setItem("view-history", JSON.stringify(productList));
}

export function getViewHistoryProducts() {
  const historyString = localStorage.getItem("view-history") || "[]";
  const productList = JSON.parse(historyString) as Product[];
  return productList;
}
