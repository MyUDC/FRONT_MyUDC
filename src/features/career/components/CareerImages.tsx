"use client"

import Image from "next/image";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';

import ImageView from "@/shared/components/ImageView";

interface Props {
  imageUrls: string[]
}

const CareerImages = ({ imageUrls }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImageView, setShowImageView] = useState(false);

  const handleOnCloseImage = () => {
    setShowImageView(false);
  }

  const handleOnClickImage = () => {
    setShowImageView(true);
  }

  const handleOnSwipeChange = (swiper: SwiperCore) => {
    setCurrentIndex(swiper.activeIndex);
  }

  return (
    <div className="w-full h-56 relative pl-4 pr-4">
      <Swiper
        initialSlide={currentIndex}
        className="h-full rounded-lg"
        onSlideChange={handleOnSwipeChange}
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide
            key={imageUrl + index}
            onClick={handleOnClickImage}
          >
            <Image
              src={imageUrl}
              alt={`Image ${index}`}
              fill
              priority
              className="object-cover h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {showImageView &&
        <ImageView
          initialIndex={currentIndex}
          imageUrls={imageUrls}
          onClose={handleOnCloseImage}
        />
      }
    </div>
  )
}

export default CareerImages;
