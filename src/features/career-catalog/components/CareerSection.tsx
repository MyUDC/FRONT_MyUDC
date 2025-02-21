"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CarouselLargeCards from "./CarouselLargeCards";
import CarouselSmallCards from "./CarouselSmallCards";
import CareerListSheet from "./CareerListSheet";
import { Career } from "@/features/career-catalog/types/Career";

type CareerSectionProps = {
  title: string;
  subtitle: string;
  careers: Career[];
  paginationClass: string;
  isLarge?: boolean;
};

export function CareerSection({
  title,
  subtitle,
  careers,
  paginationClass,
  isLarge = true,
}: CareerSectionProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleViewMore = () => {
    setIsSheetOpen(true);
  };

  const carouselsCareerLimit = 5;

  return (
    <section className="mt-8 pb-8 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <p className="max-w-2xl text-gray-500 text-sm uppercase">{subtitle}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
          {title}
        </h1>
        <Button
          variant="ghost"
          className="text-md text-green"
          onClick={handleViewMore}
        >
          Ver más
        </Button>
      </div>
      {isLarge ? (
        <CarouselLargeCards
          careers={careers.slice(0, carouselsCareerLimit)}
          paginationClass={paginationClass}
        />
      ) : (
        <CarouselSmallCards
          careers={careers.slice(0, carouselsCareerLimit)}
          paginationClass={paginationClass}
        />
      )}
      <CareerListSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={title}
        careers={careers}
      />
    </section>
  );
}
