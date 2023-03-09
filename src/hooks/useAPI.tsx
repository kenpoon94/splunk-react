import { getCharactersPage, getPostsPage } from "../api/axios";

export const getPosts: any = async ({ pageParam = 1 }) => {
  return await getPostsPage(pageParam);
};

export const getCharacters: any = async ({ pageParam = 1 }) => {
  return await getCharactersPage(pageParam);
};
