import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../api/posts";

type Props = {
  postId: number | undefined;
};

export default function DeleteButton({ postId }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => deletePost(postId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("삭제되었습니다.");
      navigate("/");
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className="px-4 py-2 rounded text-white bg-red-500"
    >
      삭제
    </button>
  );
}
