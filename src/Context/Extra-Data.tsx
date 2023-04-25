import React, { createContext } from 'react';
import { ProductCategoryType, useProductCategoryQuery } from '../Redux/end-point/prod-category';
import { BannerImgDataType, useProductBannerImgsQuery } from '../Redux/end-point/products-slide-icon';

interface ExtraDataType {
  bannerSlide?: BannerImgDataType | undefined,
  bannerSlideLoading?: boolean,
  productsCategory?: ProductCategoryType[] | undefined,
  productsCategoryLoading?: boolean
};

export const ExtraDataContext = createContext<ExtraDataType>({});

interface Props {
  children: React.ReactNode
};

function ExtraData({ children }: Props) {

  const { data: productsCategory, isLoading: productsCategoryLoading } = useProductCategoryQuery();

  const { data: bannerSlide, isLoading: bannerSlideLoading = false } = useProductBannerImgsQuery();

  const value: ExtraDataType = {
    bannerSlide,
    bannerSlideLoading,
    productsCategory,
    productsCategoryLoading
  };

  return (
    <ExtraDataContext.Provider value={ value }>
      {
        children
      }
    </ExtraDataContext.Provider>
  );
};
export default ExtraData;