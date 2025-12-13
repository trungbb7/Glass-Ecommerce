import { Header } from "@/components/Header";
import menGlassesImg from "@/assets/men_glasses.webp";
import metalGlassesImg from "@/assets/metal_glasses.webp";
import womenGlassesImg from "@/assets/women_glasses.webp";
import plasticGlassesImg from "@/assets/plastic_glasses.jpeg";
import kidsGlassesImg from "@/assets/kids_glasses.jfif";
import Banner from "./Banner/Banner";
import CategoryItem from "./CategoryItem/CategoryItem";

export default function Home() {
  return (
    <div>
      <Header />
      {/* Body */}
      <div className="mt-10 px-10">
        <Banner />
        {/* Category card */}
        <div className="flex gap-8 w-fit mx-auto mt-10">
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
      </div>
    </div>
  );
}
