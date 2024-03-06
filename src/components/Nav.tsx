import { useReadAllPostsQuery } from "../features/api/posts";

export default function Navigation({
  skip,
  limit,
}: {
  skip: number;
  limit: number;
}) {
  const { data: allPosts, isSuccess } = useReadAllPostsQuery();

  let currentPage, totalPages;
  if (isSuccess) {
    currentPage = skip / 5;
    totalPages = allPosts.posts.length / limit;
  }

  return (
    <nav className="p-4 bg-slate-800 flex justify-between items-center">
      <h1 className="text-xl basis-10 text-pretty lg:text-3xl font-semibold text-white">
        Manage Posts
      </h1>
      <p className="flex-1 flex justify-center items-center mr-5 text-xl font-semibold text-white">
        {currentPage} / {totalPages}
      </p>
      <div className="basis-20 flex flex-col">
        <p className="text-white font-medium">Total Posts</p>
        <p className="text-white text-center font-semibold text-lg">
          {allPosts?.posts.length}
        </p>
      </div>
    </nav>
  );
}
