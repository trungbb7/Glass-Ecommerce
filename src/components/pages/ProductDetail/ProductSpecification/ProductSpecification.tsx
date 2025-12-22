interface ProductSpecificationProp {
  lensWidth: number;
  templeLength: number;
  bridgeWidth: number;
  brand: string;
  origin: string;
  suitableFor: string;
  warranty: string;
  material: string;
}

export default function ProductSpecification({
  lensWidth,
  templeLength,
  bridgeWidth,
  brand,
  origin,
  suitableFor,
  warranty,
  material,
}: ProductSpecificationProp) {
  return (
    <div className="mt-8">
      <ul className="flex flex-col gap-4">
        <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
          <span>Độ rộng tròng</span>
          <span>{lensWidth}mm</span>
        </li>
        <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
          <span>Độ dài gọng</span>
          <span>{templeLength}mm</span>
        </li>
        <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
          <span>Độ dài cầu kính</span>
          <span>{bridgeWidth}mm</span>
        </li>
        <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
          <span>Thương hiệu</span>
          <span>{brand}</span>
        </li>
        <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
          <span>Xuất xứ</span>
          <span>{origin}</span>
        </li>
        <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
          <span>Phù hợp với</span>
          <span>{suitableFor}</span>
        </li>
        <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
          <span>Bảo hành</span>
          <span>{warranty}</span>
        </li>
        <li className="flex items-center justify-between pb-2 border-b border-b-neutral-300">
          <span>Chất liệu</span>
          <span>{material}</span>
        </li>
      </ul>
    </div>
  );
}
