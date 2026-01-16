interface ColorItemProp {
  color: string;
  active: boolean;
  setVariance: (color: string) => void;
}

export default function ColorItem({
  color,
  active,
  setVariance,
}: ColorItemProp) {
  return (
    <li
      onClick={() => setVariance(color)}
      data-active={active}
      style={{ backgroundColor: color }}
      className="rounded-full size-5 shadow shadow-gray-200 border-2 border-transparent data-[active=true]:border-amber-300 cursor-pointer"
    ></li>
  );
}
