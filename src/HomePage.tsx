import "./App.css";
import { Box, Flex, Container, Center, Stack, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Pagination from "./components/Pagination";
import Hide from "./components/Hide";
import Nav from "./components/Nav";
import Post from "./components/Post";
import { PostI, RMCharacterI, RMResponseI } from "./interfaces/interface";
import { getCharacters, getPosts } from "./hooks/useAPI";
import { PAGE_LIMIT, getAllPostsPage, getPostsPage } from "./api/axios";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import Character from "./components/Character";

const HomePage = () => {
  const [maxPages, setMaxPages] = useState(0);
  const {
    data: characters,
    isFetchingNextPage,
    hasNextPage,
    ref,
  } = useInfiniteScroll("characters", getCharacters, useRef<any>(null));

  const displayCharacters = characters?.pages.map((page: any) => {
    return page.map((char: RMCharacterI, i: any) => {
      if (page.length === i + 1)
        return <Character key={`character-${i}`} ref={ref} character={char} />;
      return <Character key={`character-${i}`} character={char} />;
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
            <Stack spacing="4">
              {displayCharacters}
              {isFetchingNextPage && hasNextPage ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <></>
              )}
            </Stack>
          </Center>
        </Container>
      </Flex>
    </Container>
  );
};

export default HomePage;
