import "./App.css";
import { Box, Text, Flex, Container, Center, Stack } from "@chakra-ui/react";
import Pagination from "./components/Pagination";
import { Hide } from "./components/Hide";
import Nav from "./components/Nav";
import { useRef } from "react";
import { PostI } from "./interfaces/interface";
import Post from "./components/Post";
import { getPosts } from "./hooks/usePosts";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

const HomePage = () => {
  const {
    data: posts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    ref,
  } = useInfiniteScroll("posts", getPosts, useRef<any>(null));

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
                      return <Post ref={ref} post={post} />;
                    return <Post post={post} />;
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
