import type { Comment, Post, User } from "../types/posts";
import axios from "axios";

// 게시글들 조회
export const fetchPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
  const res = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );

  return res.data;
};

// 게시글 조회
export const fetchPostById = async (id: number): Promise<Post> => {
  const res = await axios.get<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return res.data;
};

// 특정 유저 조회
export const fetchUserById = async (userId: number): Promise<User> => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  return res.data;
};

// 댓글 조회
export const fetchCommentByPostId = async (
  postId: number
): Promise<Comment[]> => {
  const res = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  return res.data;
};

// 게시글 생성
export const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newPost
  );

  return res.data;
};

// 게시글 수정
export const updatePost = async (updatedPost: Post) => {
  const res = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
    updatedPost
  );

  return res.data;
};

// 게시글 삭제
export const deletePost = async (postId: number): Promise<void> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
};
