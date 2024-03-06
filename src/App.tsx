/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import Navigation from "./components/Nav";
import Button from "./components/Button";
import PostsList from "./components/PostsList";
import {
  useListPostsQuery,
  useReadAllPostsQuery,
  usePrefetch,
} from "./features/api/posts";

function App() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);

  const {
    data: paginatedPosts,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useListPostsQuery({ skip, limit });
  const { data: allPosts } = useReadAllPostsQuery();
  const prefetchPage = usePrefetch("listPosts");

  const prefetchNext = useCallback(() => {
    prefetchPage({ skip: skip + 5, limit });
  }, [prefetchPage, skip, limit]);

  useEffect(() => {
    if (skip !== allPosts?.posts.length) {
      prefetchNext();
    }
  }, [prefetchNext, skip, allPosts]);

  let content;
  if (isLoading) {
    content = <p className="font-semibold text-2xl">Loading....</p>;
  } else if (isError) {
    content = (
      <pre className="bg-slate-100">{JSON.stringify(error, null, 2)}</pre>
    );
  } else if (isSuccess) {
    content = <PostsList paginatedPosts={paginatedPosts} />;
  }

  function goToPrevious() {
    skip !== 0 && setSkip((prev) => prev - limit);
  }

  function goToNext() {
    skip !== allPosts?.posts.length && setSkip((prev) => prev + limit);
  }

  return (
    <>
      <Navigation skip={skip} limit={limit} />
      <div className="space-x-4 flex justify-center items-center mt-4">
        <Button
          paginate={goToPrevious}
          disabled={skip === 0 ? true : false}
          label="Prev"
        />
        <Button
          isFetching={isFetching}
          paginate={goToNext}
          disabled={skip === allPosts?.posts.length ? true : false}
          label="Next"
          // onMouseEnter={prefetchNext}
        />
      </div>
      <div className="max-w-[550px] mx-auto px-2">{content}</div>
    </>
  );
}

export default App;
