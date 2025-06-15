import { useQuery } from "@tanstack/react-query";
import {
  fetchCommentByPostId,
  fetchPostById,
  fetchUserById,
} from "../api/posts";

interface PostDetailProps {
  postId: number;
}

export default function PostDetail({ postId }: PostDetailProps) {
  // post
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  // user
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user", post?.userId],
    queryFn: () => fetchUserById(post!.userId),
    enabled: !!post, // post가 있다면 실행
  });

  // comment
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentByPostId(postId),
  });

  if (isPostLoading) return <p>게시글 불러오는 중입니다...</p>;
  if (isPostError) return <p>에러 : {postError.message}</p>;

  if (!post || !user || !comments) return <p>some data is undefinded</p>;

  return (
    <div className="p-4 space-y-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">{post?.title}</h1>
      <p className="text-gray-700">{post?.body}</p>

      <div>
        <h2>작성자</h2>
        {isUserLoading ? (
          <p>작성자 정보를 불러오고 있습니다.</p>
        ) : isUserError ? (
          <p>에러 : {userError.message}</p>
        ) : (
          <p>
            {user?.name} ({user?.email})
          </p>
        )}
      </div>

      <div>
        <h2>댓글({comments?.length || 0})</h2>
        {isCommentsLoading ? (
          <p>댓글을 불러오는 중...</p>
        ) : isCommentsError ? (
          <p>에러 : {commentsError.message}</p>
        ) : (
          <ul className="list-disc ml-4 space-y-2">
            {comments?.map((comment) => (
              <li key={comment.id}>
                <p>
                  {comment.name}({comment.email})
                </p>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
