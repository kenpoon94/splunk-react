import { useState, useEffect } from "react";
import { getPostsPage } from "../api/axios";

export type PostI = {
  id: string;
  body: string;
  title: string;
};

const usePosts = (page = 1) => {
  const [results, setResults] = useState<PostI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<{ message: string } | {}>({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getPostsPage(page, { signal })
      .then((data) => {
        setResults((prev: any) => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [page]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
