import React, { useState } from "react";
import type { Post } from "../types/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../api/posts";

type PostEditorProps = {
  initialPost?: Post;
};

export default function PostEdit({ initialPost }: PostEditorProps) {
  const isEdit = !!initialPost;
  const [title, setTitle] = useState(initialPost?.title || "");
  const [body, setBody] = useState(initialPost?.body || "");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (post: Post | Omit<Post, "id">) =>
      isEdit ? updatePost(post as Post) : createPost(post as Omit<Post, "id">),

    onSuccess: () => {
      alert(isEdit ? "수정 성공!" : "작성 성공!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && initialPost) {
      mutation.mutate({
        ...initialPost,
        title,
        body,
      });
    } else {
      mutation.mutate({
        userId: 1,
        title,
        body,
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        className="p-2 w-full border"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요."
      />
      <textarea
        className="p-2 w-full border"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="내용을 입력해주세요."
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 text-white rounded bg-blue-500"
      >
        {isEdit ? "수정하기" : "작성하기"}
      </button>

      {mutation.error && (
        <p className="text-red-500">{(mutation.error as Error).message}</p>
      )}
    </form>
  );
}
