import "./App.css";
import { Flex, Container, Center, Stack, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Pagination from "./components/Pagination";
import Hide from "./components/Hide";
import Nav from "./components/Nav";
import { RMCharacterI } from "./interfaces/interface";
import { getCharacters } from "./hooks/useAPI";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import Character from "./components/Character";
import React from "react";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);

  const {
    fetchNextPage,
    fetchPreviousPage,
    data,
    isFetchingNextPage,
    hasPreviousPage,
    hasNextPage,
    ref,
  } = useInfiniteScroll("characters", getCharacters, useRef<any>(null));

  const displayCharacters = data?.pages.map((page: any) => {
    return page.results.map((char: RMCharacterI, i: any) => {
      if (page.results.length === i + 1)
        return <Character key={`character-${i}`} ref={ref} character={char} />;
      return <Character key={`character-${i}`} character={char} />;
    });
  });

  const toPrevPage = () => {
    fetchPreviousPage({ pageParam: currentPage - 1 });
  };

  const toNextPage = () => {
    fetchNextPage({ pageParam: currentPage + 1 });
  };

  const toPage = (page: number) => {
    if (currentPage < page) fetchNextPage({ pageParam: page });
    fetchPreviousPage({ pageParam: page });
  };

  useEffect(() => {
    const { pages } = data && data.pages.length > 0 ? data.pages[0].info : 0;
    setMaxPages(pages);
  }, [data]);

  return (
    <Container>
      <Nav />
      <Flex>
        <Container>
          <Center>
            <Hide threshold={200}>
              <Pagination
                maxPages={maxPages}
                currentPage={currentPage}
                toPage={toPage}
                toNextPage={toNextPage}
                toPrevPage={toPrevPage}
              />
            </Hide>
          </Center>
          <Center>
            {isFetchingNextPage && hasPreviousPage ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              <></>
            )}
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
