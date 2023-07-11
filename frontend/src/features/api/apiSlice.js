import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://chuwaweb.com'
    : 'http://localhost:8080';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
          url: 'api/auth/login',
          method: 'post',
          body: data
        })
      })
    })
});

export const {
  useLoginMutation
} = apiSlice;