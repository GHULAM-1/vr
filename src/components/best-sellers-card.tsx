import React from "react";
import Image from "next/image";
type ProductCardProps = {
  imageUrl: string;
  title: string;
  price: string;
  brand: string;
};

export default function BestSeller({
  imageUrl,
  title,
  price,
  brand,
}: ProductCardProps) {
  return (
    <>
      <div className="bg-[#222222] w-[312px] h-[471px] flex flex-col justify-between">
        <div className=" text-[#E1E8FF] text-center flex flex-col justify-center p-7 items-center ">
          <p className="text-[14px]">{brand}</p>
          <h3 className="text-[24px] font-semibold">{title}</h3>
          <p className="text-[18px]">Rs. {price}</p>
        </div>
        <img
          src={imageUrl}
          height={235}
          width={150}
          alt="image"
          className="relative w-full h-[60%]"
        />
      </div>
    </>
  );
}
