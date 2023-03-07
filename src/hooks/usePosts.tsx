import { getPostsPage } from "../api/axios";

export const getPosts: any = async ({ pageParam = 1 }) => {
  return await getPostsPage(pageParam);
};
