import techCityAPI from "../api/tech-city-api";

export interface ServicesInfoType {
    name: string,
    _id: string,
    desc: string,
    serviceIcon: string
}

const serviceInfoAPI = techCityAPI.injectEndpoints({
    endpoints: builder => ({
        serviceInfoData: builder.query<ServicesInfoType[], void>({
            query: () => `/servicesData`
        })
    })
});
export const {useServiceInfoDataQuery} = serviceInfoAPI;