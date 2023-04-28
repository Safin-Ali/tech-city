import techCityAPI from "../api/tech-city-api";


interface PriceShape {
    base: number,
    delivery: number,
    discount: number,
    total: number
}

interface OthersShape {
    color: string,
    model: string,
    year: string,
}

export interface ProdDataShape {
    deviceImage: string,
    brand: string,
    price: PriceShape,
    others: OthersShape,
    device: string,
    _id: string,
    activity: string,
    core: string[]
}

export interface RelatedBrand {
    brandName: string,
    _id: string,
    product: string[]
}

type ProdDataReturnShape = {
    readonly products: ProdDataShape[],
    readonly relatedBrands: RelatedBrand[]
}

const productsDataAPI = techCityAPI.injectEndpoints({
    endpoints: builder => ({
        productsData: builder.query<ProdDataReturnShape, void>({
            query: () => `/products?activity=all&discount=false&brand=all&device=mobile&search=null`
        })
    })
});

export const {useProductsDataQuery} = productsDataAPI