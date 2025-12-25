import { SeperateLine } from "@/components/SeperateLine";
import SidebarSelectorItem from "../SidebarSelectorItem.tsx/SidebarSelectorItem";
import { useState } from "react";
import type { Filter, FilterItem } from "@/types/filter";

interface SidebarSelectorItemProps {
  data: Filter;
  updateFilter: (items: { key: string; value: string }[]) => void;
}

export default function SidebarSelector({
  data,
  updateFilter,
}: SidebarSelectorItemProps) {
  const initData: FilterItem[] = [
    {
      title: "Tất cả",
      checked: true,
      quantity: 300,
      query: "",
    },
  ];

  const itemWithChecked = data.items.map((item) => ({
    ...item,
    checked: false,
  }));
  initData.push(...itemWithChecked);
  const [items, setData] = useState<FilterItem[]>(initData);

  function selectItem(title: string, query: string) {
    const newData = items.map((item) => ({
      ...item,
      checked: item.title === title,
    }));
    setData(newData);
    updateFilter([{ key: `${data.fieldname}_${data.operator}`, value: query }]);
    // updateFilter(
    //   [{ key: `${data.fieldname}_${data.operator}`, value: query }

    //   ]);
  }

  return (
    <div className="">
      {/* Head */}
      <div className="flex justify-between mb-1">
        <span className="font-medium text-lg text-secondary">{data.name}</span>
        <button className="text-text2 cursor-pointer rounded-sm px-1 hover:bg-gray-100 active:text-secondary ">
          Reset
        </button>
      </div>
      {/* Items */}
      <ul className="pb-6">
        {items.map((item) => (
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
