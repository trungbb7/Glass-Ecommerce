import CategoryHeading from "../CategoryHeading/CategoryHeading";
import CategoryItem from "../CategoryItem/CategoryItem";
import menGlassesImg from "@/assets/men_glasses.webp";
import metalGlassesImg from "@/assets/metal_glasses.webp";
import womenGlassesImg from "@/assets/women_glasses.webp";
import plasticGlassesImg from "@/assets/plastic_glasses.jpeg";
import kidsGlassesImg from "@/assets/kids_glasses.webp";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CategorySection() {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (sliderRef.current) {
      let isDown: boolean = false;
      let startX: number = 0;
      let scrollLeft: number = 0;

      const slider = sliderRef.current as HTMLDivElement;
      sliderRef.current.addEventListener("mousedown", (e) => {
        slider.classList.add("cursor-grabbing");

        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      sliderRef.current.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("cursor-grabbing");
      });

      sliderRef.current.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("cursor-grabbing");
      });

      sliderRef.current.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();

        const slider = sliderRef.current as HTMLDivElement;

        const x = e.pageX - scrollLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);

  function goToProductCategory(query: string) {
    navigate(`/product?${query}`);
  }

  return (
    <div className="select-none">
      <CategoryHeading
        title="Danh mục"
        description="Duyệt theo danh mục"
        className="mb-4 "
      />
      <div
        ref={sliderRef}
        className="flex flex-nowrap overflow-x-auto gap-8 w-fit mx-auto mb-8 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <CategoryItem
          image={menGlassesImg}
          category="Kính mát nam"
          inStock={200}
          className="shrink-0"
          onClick={() => {
            goToProductCategory("categories_like=^male");
          }}
        />
        <CategoryItem
          image={womenGlassesImg}
          category="Kính mát nữ"
          inStock={240}
          className="shrink-0"
          onClick={() => {
            goToProductCategory("categories_like=^female");
          }}
        />

        <CategoryItem
          image={kidsGlassesImg}
          category="Kính mát trẻ em"
          inStock={130}
          className="shrink-0"
          onClick={() => {
            goToProductCategory("categories_like=^kid");
          }}
        />
        <CategoryItem
          image={plasticGlassesImg}
          category="Kính mát nhựa"
          inStock={110}
          className="shrink-0"
          onClick={() => {
            goToProductCategory("specification.material_like=^Nhựa");
          }}
        />

        <CategoryItem
          image={metalGlassesImg}
          category="Kính mát Kim loại"
          inStock={50}
          className="shrink-0"
          onClick={() => {
            goToProductCategory("specification.material_like=^Kim+loại");
          }}
        />
      </div>
    </div>
  );
}
