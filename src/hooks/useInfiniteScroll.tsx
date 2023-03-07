import "../App.css";
import { useCallback } from "react";
import { useInfiniteQuery } from "react-query";

const useInfiniteScroll = (
  queryKey: string,
  getData: () => any,
  observer: any
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery([queryKey], getData, {
      getNextPageParam: (lastPage: any[], allPages: any[]) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  const ref = useCallback(
    (post: any) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) fetchNextPage();
      });

      if (post) observer.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return { data, isFetchingNextPage, fetchNextPage, hasNextPage, ref };
};

export default useInfiniteScroll;
