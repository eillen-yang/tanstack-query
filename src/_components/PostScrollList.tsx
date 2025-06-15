import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";
import { useEffect, useRef } from "react";

export default function PostScrollList() {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    // 다음 페이지가 있는지 확인여부
    hasNextPage,
    // 다음 페이지를 불러오기까지의 전 상태
    isFetchingNextPage,
    // data에 대한 상태
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts-scroll"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= 10 ? nextPage : undefined;
    },
  });

  // IntersectionObserver로 스크롤 하단감지
  useEffect(() => {
    if (!hasNextPage || !bottomRef.current) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [bottomRef, hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Error : {error.message}</p>;

  return (
    <div className="space-y-4">
      {data?.pages.flat().map((post) => (
        <div key={post.id} className="p-4 border rounded shadow-sm bg-white">
          <h3 className="font-semibold text-lg">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.body}</p>
        </div>
      ))}

      <div ref={bottomRef} className="h-10" />

      {isFetchingNextPage && <p>Loading more...</p>}

      {!hasNextPage && (
        <p className="text-center text-gray-400">No more posts</p>
      )}
    </div>
  );
}
