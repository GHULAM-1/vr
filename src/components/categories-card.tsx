import React from "react";

export default function CategoriesCard({
  imageUrl,
  children,
}: {
  imageUrl: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-[202px] w-[202px] rounded-lg">
      <img
        src={imageUrl}
        alt="Background"
        className="absolute w-full h-full object-cover rounded-lg"
      />
      <div className="absolute w-full h-full rounded-lg flex justify-start items-end bg-black bg-opacity-50">
        <span className="text-white text-lg font-bold p-4 text-center">
          {children}
        </span>
      </div>
    </div>
  );
}
