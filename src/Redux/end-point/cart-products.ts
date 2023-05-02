import techCityAPI from "../api/tech-city-api";
import {ProdDataShape} from './products-data';

type QueryType = string;

const cartProductsAPI = techCityAPI.injectEndpoints({
    endpoints: builder => ({
        cartProducts: builder.query<ProdDataShape[],QueryType>({
            query: (idArr) => {
                return `/cart-products?productsId=${idArr}`
            }
        })
    })
});

export const {useCartProductsQuery} = cartProductsAPI;