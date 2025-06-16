import { useParams } from "react-router-dom";
import DeleteButton from "../_components/DeleteButton";
import PostEdit from "../_components/PostEdit";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../api/posts";

export default function EditPostPage() {
  const { id } = useParams();
  const postId = Number(id!);

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="mb-4 text-2xl font-bold">게시글 작성</h1>
      <PostEdit initialPost={post} />
      <DeleteButton postId={post?.id} />
    </div>
  );
}
