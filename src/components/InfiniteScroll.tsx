import "../App.css";
import { useRef, useState, useCallback } from "react";
import { Text, Box, Stack } from "@chakra-ui/react";

import usePosts from "../hooks/usePosts";
import { PostI } from "../interfaces/interface";
import Post from "./Post";

const InfiniteScroll = (props: any) => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(page);

  const intersectionObserver = useRef<any>(null);
  const lastPostRef = useCallback(
    (post: any) => {
      if (isLoading) return;
      if (intersectionObserver.current)
        intersectionObserver.current.disconnect();

      intersectionObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          setPage((prev) => prev + 1);
        }
      });

      if (post) intersectionObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const content = results.map((post: PostI, i: number) => {
    if (results.length === i + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  if (isError)
    return (
      <Box>
        <p>Error</p>
      </Box>
    );

  return (
    <Box>
      {isLoading && <Text>Loading more posts ...</Text>}
      <Stack spacing="4">{content}</Stack>
    </Box>
  );
};

export default InfiniteScroll;
