import "./App.css";
import {
  Box,
  Text,
  Flex,
  Container,
  Center,
  Stack,
  Spinner,
} from "@chakra-ui/react";
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
    hasNextPage,
    ref,
  } = useInfiniteScroll("posts", getPosts, useRef<any>(null));

  const LoadingSpinner = () => {
    return isFetchingNextPage && hasNextPage ? (
      <Center>
        <Spinner />
      </Center>
    ) : (
      <></>
    );
  };

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
              <Pagination />
            </Hide>
          </Center>
          <Center>
            <Box>
              <Stack spacing="4">
                {displayPosts}
                <LoadingSpinner />
              </Stack>
            </Box>
          </Center>
        </Container>
      </Flex>
    </Container>
  );
};

export default HomePage;
