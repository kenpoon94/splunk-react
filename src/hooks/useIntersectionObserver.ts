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
    (item: any) => {
      if (!observer || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        } //
      });

      if (item) observer.current.observe(item);
    },
    [isFetchingNextPage, fetchNextPage, fetchPreviousPage, hasNextPage]
  );
};

export default useIntersectionObserver;
