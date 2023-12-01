import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { ReactChild } from "react";

import { Carousel as CarouselPackage } from "react-responsive-carousel";

interface ICarouselProps {
  children: ReactChild[] | undefined;
}

const Carousel: React.FC<ICarouselProps> = ({ children }) => {
  return (
    <CarouselPackage showThumbs={false} showStatus={false} infiniteLoop>
      {children}
    </CarouselPackage>
  );
};

export default Carousel;
