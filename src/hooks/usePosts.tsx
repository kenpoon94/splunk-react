import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { getPostsPage } from "../api/axios";

export type PostI = {
  id: string;
  body: string;
  title: string;
};

const usePosts = () => {
  const getPosts: any = async ({ pageParam = 1 }) => {
    return await getPostsPage(pageParam);
  };

  return useInfiniteQuery(["posts"], getPosts, {
    getNextPageParam: (lastPage: any[], allPages: any[]) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;
