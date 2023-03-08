import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const PAGE_LIMIT = 10;

export const getPostsPage = async (page = 1, options = {}) => {
  const response = await api.get(
    `/posts?_page=${page}&_limit${PAGE_LIMIT}`,
    options
  );
  return response.data;
};

export const getAllPostsPage = async (options = {}) => {
  const response = await api.get(`/posts`, options);
  return response.data;
};
