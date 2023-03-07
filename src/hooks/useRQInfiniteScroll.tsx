import "../App.css";
import { useRef, useCallback } from "react";
import { Text, Box, Stack } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";

import { getPostsPage } from "../api/axios";
import { PostI } from "../interfaces/interface";
import Post from "../components/Post";

const useRQInfiniteScroll = (props: any) => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    "/posts",
    ({ pageParam = 1 }) => getPostsPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const intersectionObserver = useRef<any>(null);
  const lastPostRef = useCallback(
    (post: any) => {
      if (isFetchingNextPage) return;
      if (intersectionObserver.current)
        intersectionObserver.current.disconnect();

      intersectionObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          fetchNextPage();
        }
      });

      if (post) intersectionObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
};

export default useRQInfiniteScroll;
