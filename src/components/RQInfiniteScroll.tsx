import "../App.css";
import { useRef, useCallback } from "react";
import { Text, Box, Stack } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";

import { getPostsPage } from "../api/axios";
import { PostI } from "../interfaces/interface";
import Post from "./Post";

const RQInfiniteScroll = (props: any) => {
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

  const content = data?.pages.map((page: PostI[]) => {
    return page.map((post: PostI, i: any) => {
      if (page.length === i + 1) {
        return <Post ref={lastPostRef} key={post.id} post={post} />;
      }
      return <Post key={post.id} post={post} />;
    });
  });

  if (status === "error")
    return (
      <Box>
        <p>Error</p>
      </Box>
    );

  return (
    <Box>
      {isFetchingNextPage && <Text>Loading more posts ...</Text>}
      <Stack spacing="4">{content}</Stack>
    </Box>
  );
};

export default RQInfiniteScroll;
