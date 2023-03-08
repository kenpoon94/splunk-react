import "./App.css";
import { Box, Flex, Container, Center, Stack, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Pagination from "./components/Pagination";
import Hide from "./components/Hide";
import Nav from "./components/Nav";
import Post from "./components/Post";
import { PostI } from "./interfaces/interface";
import { getPosts } from "./hooks/useAPI";
import { PAGE_LIMIT, getAllPostsPage } from "./api/axios";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

const HomePage = () => {
  const [maxPages, setMaxPages] = useState(0);
  const {
    data: posts,
    isFetchingNextPage,
    hasNextPage,
    ref,
  } = useInfiniteScroll("posts", getPosts, useRef<any>(null));

  useEffect(() => {
    getAllPostsPage().then((data) => {
      setMaxPages(Math.ceil(data.length / PAGE_LIMIT));
    });
  }, []);

  const displayPosts = posts?.pages.map((page: any) => {
    return page.map((post: PostI, i: any) => {
      if (page.length === i + 1) return <Post ref={ref} post={post} />;
      return <Post post={post} />;
    });
  });

  return (
    <Container>
      <Nav />
      <Flex>
        <Container>
          <Center>
            <Hide threshold={200}>
              <Pagination maxPages={maxPages} toPage={() => null} />
            </Hide>
          </Center>
          <Center>
            <Box>
              <Stack spacing="4">
                {displayPosts}
                {isFetchingNextPage && hasNextPage ? (
                  <Center>
                    <Spinner />
                  </Center>
                ) : (
                  <></>
                )}
              </Stack>
            </Box>
          </Center>
        </Container>
      </Flex>
    </Container>
  );
};

export default HomePage;
