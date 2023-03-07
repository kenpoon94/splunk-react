import "./App.css";
import { Box, Text, Flex, Container, Center, Stack } from "@chakra-ui/react";
import Pagination from "./components/Pagination";
import { Hide } from "./components/Hide";
import Nav from "./components/Nav";
import { useCallback, useRef } from "react";
import usePosts from "./hooks/usePosts";
import { PostI } from "./interfaces/interface";
import Post from "./components/Post";

const HomePage = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

  const intersectionObserver = useRef<any>(null);
  const lastPostRef = useCallback(
    (post: any) => {
      if (isFetchingNextPage) return;
      if (intersectionObserver.current)
        intersectionObserver.current.disconnect();

      intersectionObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (post) intersectionObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <Container>
      <Nav />
      <Flex>
        <Container>
          <Center>
            <Hide threshold={200}>
              <Pagination />
            </Hide>
          </Center>
          <Center>
            <Box>
              {isFetchingNextPage && <Text>Loading more posts...</Text>}
              <Stack spacing="4">
                {posts?.pages.map((page: any) => {
                  return page.map((post: PostI, i: any) => {
                    if (page.length === i + 1)
                      return (
                        <Post ref={lastPostRef} key={post.id} post={post} />
                      );
                    return <Post key={post.id} post={post} />;
                  });
                })}
              </Stack>
            </Box>
          </Center>
        </Container>
      </Flex>
    </Container>
  );
};

export default HomePage;
