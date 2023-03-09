import "./App.css";
import { Flex, Container, Center, Stack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import Hide from "./components/Hide";
import Nav from "./components/Nav";
import { RMCharacterI } from "./interfaces/interface";
import { getCharacters, ITEMS_PER_PAGE } from "./hooks/useAPI";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import Character from "./components/Character";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    ref,
  } = useInfiniteScroll("characters", getCharacters, ITEMS_PER_PAGE);

  const displayCharacters = data?.pages.map((page: any) => {
    return page.results.map((char: RMCharacterI, i: any) => {
      if (ITEMS_PER_PAGE === i + 1)
        return <Character ref={ref} character={char} />;
      return <Character character={char} />;
    });
  });

  // Scenario and flow
  // 1. Page 1 loads and user scroll as usual
  // 2. Page 1 loads and user decides to paginate to page 5
  //    - Remove all data and start from scratch
  //      - Load and jump to page 5
  //      - Use intersectionObserver to do two way infinite query + scrolling
  //    - Retain previously loaded data
  //      - Load and jump to page 5
  //      - Use intersectionObserver to do two way infinite query + scrolling ; at the same time maintaining the array order
  // 3. Page 1 loads and user decides to use arrow keys to paginate
  //    - Should operate as (1) scenario except jump page by page + loading

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
    let maxPg = data && data.pages.length > 0 ? data.pages[0].info.pages : 0;
    setMaxPages(maxPg);
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
