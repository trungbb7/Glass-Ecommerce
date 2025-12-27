import { Button } from "@/components/Button";
import secondaryHomeBanner from "@/assets/second_home_banner.png";

interface RecommededBannerProps {
  className?: string;
}

export default function RecommededBanner({ className }: RecommededBannerProps) {
  return (
    <div className={`flex h-100 p-10 bg-black ${className}`}>
      {/* Left side */}
      <div className="w-1/2 flex grow-5 flex-col gap-6 justify-center">
        <p className="text-green-400 font-medium">Mới ra mắt</p>
        <p className="text-white font-bold text-4xl">
          Nâng tầm trải nghiệm và phong cách hiện đại
        </p>
        <Button type="primary" color="green">
          Mua ngay
        </Button>
      </div>
      {/* Right side */}
      <div className="relative grow-5 w-1/2 flex items-center justify-end">
        <div className="size-80 rounded-full blur-3xl bg-white/20"></div>
        <img
          src={secondaryHomeBanner}
          alt="banner"
          className="absolute size-80"
        />
      </div>
    </div>
  );
}
