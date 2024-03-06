import { ReturnedType } from "../lib/types";

export default function PostsList({
  paginatedPosts,
}: {
  paginatedPosts: ReturnedType;
}) {
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
        </section>
      ))}
    </article>
  );
}
