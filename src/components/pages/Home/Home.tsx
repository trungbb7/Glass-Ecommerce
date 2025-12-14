import { Header } from "@/components/Header";
import menGlassesImg from "@/assets/men_glasses.webp";
import metalGlassesImg from "@/assets/metal_glasses.webp";
import womenGlassesImg from "@/assets/women_glasses.webp";
import plasticGlassesImg from "@/assets/plastic_glasses.jpeg";
import kidsGlassesImg from "@/assets/kids_glasses.jfif";
import productImg1 from "@/assets/product_img1.jpg";
import Banner from "./Banner/Banner";
import CategoryItem from "./CategoryItem/CategoryItem";
import CategoryHeading from "./CategoryHeading/CategoryHeading";
import ProductItem from "@/components/ProductItem/ProductItem";
import RecommededBanner from "./RecommendedBanner/RecommendedBanner";
import { SeperateLine } from "@/components/SeperateLine";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div>
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
        <CategoryHeading
          title="Danh mục"
          description="Duyệt theo danh mục"
          className="mb-4 "
        />
        <div className="flex flex-wrap gap-8 w-fit mx-auto mb-8">
          <CategoryItem
            image={menGlassesImg}
            category="Kính mát nam"
            inStock={200}
          />
          <CategoryItem
            image={womenGlassesImg}
            category="Kính mát nữ"
            inStock={240}
          />

          <CategoryItem
            image={kidsGlassesImg}
            category="Kính mát trẻ em"
            inStock={130}
          />
          <CategoryItem
            image={plasticGlassesImg}
            category="Kính mát nhựa"
            inStock={110}
          />

          <CategoryItem
            image={metalGlassesImg}
            category="Kính mát Kim loại"
            inStock={50}
          />
        </div>
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
