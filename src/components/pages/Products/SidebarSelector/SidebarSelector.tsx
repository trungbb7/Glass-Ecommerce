import { SeperateLine } from "@/components/SeperateLine";
import SidebarSelectorItem, {
  type ItemData,
} from "../SidebarSelectorItem.tsx/SidebarSelectorItem";
import { useState } from "react";

const itemData: ItemData[] = [
  {
    title: "Tất cả",
    checked: true,
    quantity: 300,
  },
  {
    title: "Kính mát nam",
    checked: false,
    quantity: 80,
  },
  {
    title: "Kính mát nữ",
    checked: false,
    quantity: 70,
  },
  {
    title: "Kính mát unisex",
    checked: false,
    quantity: 60,
  },
  {
    title: "Kính mát trẻ em",
    checked: false,
    quantity: 40,
  },
  {
    title: "Kính mát kim loại",
    checked: false,
    quantity: 120,
  },
  {
    title: "Kính mát nhựa",
    checked: false,
    quantity: 90,
  },
];

export default function SidebarSelector() {
  const [data, setData] = useState<ItemData[]>(itemData);

  function selectItem(title: string) {
    const newData = data.map((item) => ({
      ...item,
      checked: item.title === title,
    }));
    setData(newData);
  }

  return (
    <div className="">
      {/* Head */}
      <div className="flex justify-between mb-1">
        <span className="font-medium text-lg text-secondary">Danh mục</span>
        <button className="text-text2 cursor-pointer rounded-sm px-1 hover:bg-gray-100 active:text-secondary ">
          Reset
        </button>
      </div>
      {/* Items */}
      <ul className="pb-6">
        {data.map((item) => (
          <SidebarSelectorItem
            selectItem={selectItem}
            data={item}
            key={item.title}
          />
        ))}
      </ul>
      <SeperateLine />
    </div>
  );
}
