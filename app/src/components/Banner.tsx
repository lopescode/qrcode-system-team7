import Image from "next/image";
import React from "react";
import BannerImage from "../assets/images/banner.jpg";

const bannerItem = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  image: BannerImage,
  imageAlt: "Banner",
  title: "aproveite as ofertas do dia!",
};

export const Banner: React.FC = () => {
  return (
    <>
      <div className="w-full overflow-hidden">
        <Image
          className="w-full h-full object-cover  transition duration-200 ease-out hover:ease-in cursor-pointer hover:scale-110"
          src={bannerItem.image}
          alt={bannerItem.imageAlt}
        />
      </div>
      <div className="p-3 cursor-pointer hover:font-semibold">
        <h1 className="text-orange-400 text-xl uppercase">
          {bannerItem.title}
        </h1>
        <p className="text-white text-lg">{bannerItem.description}</p>
      </div>
    </>
  );
};
