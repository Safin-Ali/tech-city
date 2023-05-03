import techCityAPI from "../api/tech-city-api";

export interface QueryType {
    device: string,
    brand: string,
    id: string
};

const productByIdAPI = techCityAPI.injectEndpoints({
    endpoints: builder => ({
        productData: builder.query<any,QueryType>({
            query: (Query) => {
                const {brand,device,id} = Query;
                return `/product/${brand}/${device}/${id}`
            }
        })
    })
});

export const {useProductDataQuery} = productByIdAPI