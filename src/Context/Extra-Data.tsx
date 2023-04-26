import React, { createContext } from 'react';
import { ProductCategoryType, useProductCategoryQuery } from '../Redux/end-point/prod-category';
import { BannerImgDataType, useProductBannerImgsQuery } from '../Redux/end-point/products-slide-icon';
import { ServicesInfoType, useServiceInfoDataQuery } from '../Redux/end-point/services-info';

interface ExtraDataType {
  bannerSlide?: BannerImgDataType | undefined,
  bannerSlideLoading?: boolean,
  productsCategory?: ProductCategoryType[] | undefined,
  productsCategoryLoading?: boolean,
  servicesInfo?: ServicesInfoType[] | undefined,
  servicesInfoLoading?: boolean
};

export const ExtraDataContext = createContext<ExtraDataType>({});

interface Props {
  children: React.ReactNode
};

function ExtraData({ children }: Props) {

  const { data: productsCategory, isLoading: productsCategoryLoading } = useProductCategoryQuery();

  const { data: bannerSlide, isLoading: bannerSlideLoading = false } = useProductBannerImgsQuery();

  const { data: servicesInfo, isLoading: servicesInfoLoading} = useServiceInfoDataQuery();

  const value: ExtraDataType = {
    bannerSlide,
    bannerSlideLoading,
    productsCategory,
    productsCategoryLoading,
    servicesInfo,
    servicesInfoLoading
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