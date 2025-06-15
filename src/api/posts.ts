import type { Comment, Post, User } from "../types/posts";
import axios from "axios";

export const fetchPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
  const res = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );

  return res.data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const res = await axios.get<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return res.data;
};

export const fetchUserById = async (userId: number): Promise<User> => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  return res.data;
};

export const fetchCommentByPostId = async (
  postId: number
): Promise<Comment[]> => {
  const res = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  return res.data;
};
