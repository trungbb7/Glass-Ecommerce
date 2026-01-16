import { Header } from "@/components/Header";

import Banner from "./Banner/Banner";
import CategoryHeading from "./CategoryHeading/CategoryHeading";
import ProductItem from "@/components/ProductItem/ProductItem";
import RecommendedBanner from "./RecommendedBanner/RecommendedBanner";
import { SeperateLine } from "@/components/SeperateLine";
import { Footer } from "@/components/Footer";
import CategorySection from "./CategorySection/CategorySection";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/types/product";

export default function Home() {
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const scrollTargetRef = useRef<HTMLDivElement | null>(null);

  function scrollToTarget() {
    scrollTargetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Fetch products
  useEffect(() => {
    async function fetchOnSaleProducts() {
      const response = await fetch(
        "http://localhost:3000/products?onSale=true&_limit=4",
      );
      const productsObj = (await response.json()) as Product[];
      setOnSaleProducts(productsObj);
    }

    async function fetchNewProducts() {
      const response = await fetch(
        "http://localhost:3000/products?isNew=true&_limit=8",
      );
      const productsObj = (await response.json()) as Product[];
      setNewProducts(productsObj);
    }

    fetchNewProducts();
    fetchOnSaleProducts();
  }, []);

  return (
    <div className="text-text1">
      <Header />
      {/* Body */}
      <div className="mt-10 px-30">
        <Banner scrollFunction={scrollToTarget} />

        <SeperateLine className="my-15" />

        {/* Flash Sales */}

        <div ref={scrollTargetRef} className="h-fit">
          <CategoryHeading
            title="Hôm nay"
            description="Flash Sales"
            endDate={new Date(2026, 2, 10, 0, 0, 0)}
            className="mb-4 "
          />
          <div className="flex flex-wrap gap-4 mb-8">
            {onSaleProducts.map((product) => (
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
        </div>

        <SeperateLine className="my-15" />

        {/* Category */}
        <CategorySection />
        {/* 
        <SeperateLine className="my-15" /> */}

        <RecommendedBanner className="mb-8" />

        <SeperateLine className="my-15" />

        {/* New Products */}

        <CategoryHeading
          title="Sản phẩm mới"
          description="Khám phá các dòng sản phẩm hiện đại"
          className="mb-4"
        />
        <div className="flex flex-wrap gap-4 mb-8">
          {newProducts.map((product) => (
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

        <SeperateLine className="my-15" />
      </div>

      <Footer />
    </div>
  );
}
