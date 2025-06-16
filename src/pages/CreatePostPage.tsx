import PostEdit from "../_components/PostEdit";

export default function CreatePostPage() {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="mb-4 text-2xl font-bold">게시글 작성</h1>
      <PostEdit />
    </div>
  );
}
