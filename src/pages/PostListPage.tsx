import PostScrollList from "../_components/PostScrollList";

export default function PostListPage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 overflow-y-auto border-r border-gray-300 p-4">
        <h2 className="mb-4 text-2xl font-bold">스크롤 기반 무한 스크롤</h2>
        <PostScrollList />
      </div>
      <div className="w-1/2 h-full overflow-y-auto p-4">
        <h2 className="text-2xl font-bold mb-4">버튼 기반 무한 스크롤</h2>
      </div>
    </div>
  );
}
