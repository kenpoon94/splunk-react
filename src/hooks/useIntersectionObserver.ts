import { MutableRefObject, useCallback, useRef } from "react";

type Props = {
  isFetchingNextPage: boolean;
  observer?: MutableRefObject<any>;
  hasNextPage: boolean | undefined;
  hasPreviousPage: boolean | undefined;
  fetchNextPage: () => any;
  fetchPreviousPage: () => any;
};

const useIntersectionObserver = ({
  isFetchingNextPage,
  observer,
  hasNextPage,
  hasPreviousPage,
  fetchNextPage,
  fetchPreviousPage,
}: Props) => {
  return useCallback(
    (post: any) => {
      if (!observer || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        } //
      });

      if (post) observer.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, fetchPreviousPage, hasNextPage]
  );
};

export default useIntersectionObserver;
