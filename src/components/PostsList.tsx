import { useEffect } from "react";
import { ReturnedType } from "../lib/types";
import { useDeletePostMutation } from "../features/api/posts";

export default function PostsList({
  paginatedPosts,
}: {
  paginatedPosts: ReturnedType;
}) {
  const [deletePost, { data: deletedPost, isLoading, isSuccess }] =
    useDeletePostMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(deletedPost);
    }
  }, [isSuccess, deletedPost]);

  return (
    <article className="m-4 flex flex-col gap-6">
      {paginatedPosts.posts.map((post) => (
        <section
          key={post.id}
          className="w-full mx-auto p-4 bg-slate-50 rounded-lg ring-1 ring-slate-900/5 shadow-md"
        >
          <h1 className="font-mono text-slate-800 text-pretty font-semibold text-lg lg:text-2xl mb-4">
            {post.title}
          </h1>
          <p className="text-slate-700 font-medium text-base line-clamp-2">
            {post.body}
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="max-w-max px-2 rounded-md font-medium text-base bg-green-200/50 text-green-600"
              >
                {tag}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 rounded-md max-w-max px-4 py-1 text-white font-semibold bg-red-500"
            onClick={() => deletePost(post.id)}
          >
            {isLoading ? (
              <div className="animate-spin border-[3px] border-t-red-800 rounded-full w-5 h-5"></div>
            ) : (
              "DELETE"
            )}
          </button>
        </section>
      ))}
    </article>
  );
}
