import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

export default function PostButtonList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts-button"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= 10 ? nextPage : undefined;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="space-y-4 bg-gray-100 p-4 rounded shadow h-full overflow-y-auto">
      {data?.pages.flat().map((post) => (
        <div key={post.id} className="p-4 bg-white rounded shadow-sm">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.body}</p>
        </div>
      ))}

      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isFetchingNextPage ? "Loading more ..." : "더 보기"}
        </button>
      )}
    </div>
  );
}
