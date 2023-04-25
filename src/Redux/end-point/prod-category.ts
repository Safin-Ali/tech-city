import techCityAPI from "../api/tech-city-api";

export interface ProductCategoryType {
    _id: string,
    category: string,
    icon: string,
    description: string,
}


const productCategoryAPI = techCityAPI.injectEndpoints({
    endpoints: builder => ({
        productCategory: builder.query<ProductCategoryType[], void>({
            query: () => `/categories`
        })
    }),
});

export const { useProductCategoryQuery } = productCategoryAPI;