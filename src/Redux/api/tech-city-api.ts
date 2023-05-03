import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const techCityAPI = createApi({
    reducerPath: `tech-city-api`,
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_TECH_CITY_API_BASE_URL}),
    endpoints: builder => ({})
});

export default techCityAPI