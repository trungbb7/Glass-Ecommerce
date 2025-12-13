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

export default function Home() {
  return (
    <div>
      <Header />
      {/* Body */}
      <div className="mt-10 px-30">
        <Banner />
        {/* Category card */}
        <CategoryHeading title="Danh mục" description="Duyệt theo danh mục" />
        <div className="flex gap-8 w-fit mx-auto my-10">
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

        <CategoryHeading
          title="Hôm nay"
          description="Flash Sales"
          className="mb-4"
        />
        <div className="flex flex-wrap gap-4">
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
      </div>

      {/* Place holder */}
      <div className="h-60"></div>
    </div>
  );
}
