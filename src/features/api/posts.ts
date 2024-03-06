import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReturnedType } from "../../lib/types";

export const api = createApi({
  reducerPath: "/posts",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    readAllPosts: builder.query<ReturnedType, void>({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    listPosts: builder.query<ReturnedType, { skip: number; limit: number }>({
      query: ({ skip = 0, limit = 5 }) => `/posts?limit=${limit}&skip=${skip}`,
      providesTags: ["Posts"],
    }),
  }),
});

export const { useReadAllPostsQuery, useListPostsQuery, usePrefetch } = api;
