import { useParams } from "react-router-dom";
import PostDetail from "../_components/PostDetail";

export default function PostDetailPage() {
  const { id } = useParams();

  const postId = parseInt(id!, 10);

  if (isNaN(postId)) return <p>유효하지 않은 게시글 ID입니다.</p>;

  return <PostDetail postId={postId} />;
}
