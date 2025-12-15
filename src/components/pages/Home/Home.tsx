import { Header } from "@/components/Header";

import productImg1 from "@/assets/product_img1.jpg";
import Banner from "./Banner/Banner";
import CategoryHeading from "./CategoryHeading/CategoryHeading";
import ProductItem from "@/components/ProductItem/ProductItem";
import RecommededBanner from "./RecommendedBanner/RecommendedBanner";
import { SeperateLine } from "@/components/SeperateLine";
import { Footer } from "@/components/Footer";
import CategorySection from "./CategorySection/CategorySection";

export default function Home() {
  return (
    <div className="text-text1">
      <Header />
      {/* Body */}
      <div className="mt-10 px-30">
        <Banner />

        <SeperateLine className="my-15" />

        {/* Flash Sales */}

        <CategoryHeading
          title="Hôm nay"
          description="Flash Sales"
          endDate={new Date(2026, 2, 10, 0, 0, 0)}
          className="mb-4 "
        />
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
        </div>

        <SeperateLine className="my-15" />

        {/* Category */}
        <CategorySection />
        {/* 
        <SeperateLine className="my-15" /> */}

        <RecommededBanner className="mb-8" />

        <SeperateLine className="my-15" />

        {/* New Products */}

        <CategoryHeading
          title="Sản phẩm mới"
          description="Khám phá các dòng sản phẩm hiện đại"
          className="mb-4"
        />
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
        </div>

        <SeperateLine className="my-15" />
      </div>

      <Footer />
    </div>
  );
}
