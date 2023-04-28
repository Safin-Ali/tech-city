import techCityAPI from "../api/tech-city-api";

const filterOptionAPI = techCityAPI.injectEndpoints({
    endpoints: builder => ({
        filterOption: builder.query<{},void>({
            query: () => '/filter-options'
        })
    })
});

export const {useFilterOptionQuery} = filterOptionAPI;