import { Button } from "@/components/ui/button";
import CarouselLargeCards from "./CarouselLargeCards";
import CarouselSmallCards from "./CarouselSmallCards";

type Career = {
  id: string;
  name: string;
  slug: string;
  faculty: string;
};

type CareerSectionProps = {
  title: string;
  subtitle: string;
  careers: Career[];
  paginationClass: string;
  isLarge?: boolean;
};

export const CareerSection: React.FC<CareerSectionProps> = ({
  title,
  subtitle,
  careers,
  paginationClass,
  isLarge = true,
}) => (
  <section className="mt-8 pb-8 border-b border-gray-200">
    <div className="flex justify-between items-center">
      <p className="max-w-2xl text-gray-500 text-sm uppercase">{subtitle}</p>
    </div>
    <div className="flex justify-between items-center mb-4">
      <h1 className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
        {title}
      </h1>
      <Button variant="ghost" className="text-md text-green">
        Ver más
      </Button>
    </div>
    {isLarge ? (
      <CarouselLargeCards careers={careers} paginationClass={paginationClass} />
    ) : (
      <CarouselSmallCards careers={careers} paginationClass={paginationClass} />
    )}
  </section>
);
