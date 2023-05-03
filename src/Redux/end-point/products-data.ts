import { FilterOptionsShapeType } from "../../Services/Utils/filter-options-controller";
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

interface QueryType extends FilterOptionsShapeType {
    search: string | null
}

const productsDataAPI = techCityAPI.injectEndpoints({
    endpoints: builder => ({
        productsData: builder.query<ProdDataReturnShape, QueryType>({
            query: (filter) => {
                const {activity,brands,device,discount,search} = filter;
                return `/products?activity=${activity}&discount=${discount}&brand=${brands}&device=${device}&search=${search}`
            }
        })
    })
});

export const {useProductsDataQuery} = productsDataAPI