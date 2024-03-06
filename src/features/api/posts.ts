import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostTypes, ReturnedType } from "../../lib/types";

export const api = createApi({
  reducerPath: "/posts",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    createPost: builder.mutation<PostTypes, Partial<PostTypes>>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "PARTIAL-LIST" }, "Posts"],
    }),
    readAllPosts: builder.query<ReturnedType, void>({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    listPosts: builder.query<ReturnedType, { skip: number; limit: number }>({
      query: ({ skip = 0, limit = 5 }) => `/posts?limit=${limit}&skip=${skip}`,
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Posts", id: "PARTIAL-LIST" }],
    }),
    deletePost: builder.mutation<PostTypes, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Posts", id },
        { type: "Posts", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useReadAllPostsQuery,
  useListPostsQuery,
  useDeletePostMutation,
  usePrefetch,
} = api;
