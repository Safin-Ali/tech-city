import techCityAPI from "../api/tech-city-api";

export interface BannerImgDataType {
    _id: string,
    type: string,
    bannerimages: string[],
};

const productSlideBannerAPI = techCityAPI.injectEndpoints({
    endpoints: builder => ({
        productBannerImgs: builder.query<BannerImgDataType, void>({
            query: () => `/additionalImgs`
        })
    }),
});

export const { useProductBannerImgsQuery } = productSlideBannerAPI;