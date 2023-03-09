import "../App.css";
import { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "./useIntersectionObserver";

const useInfiniteScroll = (
  queryKey: string,
  getData: () => any,
  itemsPerPage: number
) => {
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([queryKey], getData, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.results.length === itemsPerPage
        ? allPages.length + 1
        : undefined;
    },
  });
  let ref = useIntersectionObserver({
    observer: useRef(null),
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    ref,
  };
};

export default useInfiniteScroll;
