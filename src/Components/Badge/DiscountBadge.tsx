import React from "react";

interface Props {
  children: number
}

const DiscountBadge = ({ children }: Props) => {
  return (
    <div className="absolute w-full right-4 top-2">
      <div className={`w-[15%] relative ml-auto`}>
        <img src="https://i.ibb.co/jfVL8rY/discount-rounded-badge.png" alt="discount_badge" />
        <div className={`product-card-discount-badge ${children >= 10 ? 'text-lg' : 'text-xl'}`}>
          <strong>{children}%</strong>
        </div>
      </div>
    </div>
  );
};

export default DiscountBadge;
