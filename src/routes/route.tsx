import { createBrowserRouter } from "react-router-dom";
import PostListPage from "../pages/PostListPage";
import PostDetailPage from "../pages/PostDetailPage";
import CreatePostPage from "../pages/CreatePostPage";
import EditPostPage from "../pages/EditPostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PostListPage />,
  },
  {
    path: "/posts/:id",
    element: <PostDetailPage />,
  },
  {
    path: "/create",
    element: <CreatePostPage />,
  },
  {
    path: "/edit/:id",
    element: <EditPostPage />,
  },
]);
