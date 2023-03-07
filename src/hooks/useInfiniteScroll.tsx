import "../App.css";
import { useRef, useState, useCallback } from "react";
import { Text, Box, Stack } from "@chakra-ui/react";

import usePosts from "./usePosts";
import { PostI } from "../interfaces/interface";
import Post from "../components/Post";

const useInfiniteScroll = (props: any) => {
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
};

export default useInfiniteScroll;
