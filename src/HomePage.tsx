import "./App.css";
import {
  Flex,
  Container,
  Center,
  Stack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import Hide from "./components/Hide";
import Nav from "./components/Nav";
import { RMCharacterI } from "./interfaces/interface";
import { getCharacters, ITEMS_PER_PAGE } from "./hooks/useAPI";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import Character from "./components/Character";

const HomePage = () => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastJumpedPage, setLastJumpedPage] = useState(1);
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
      // First and last item tag
      if (ITEMS_PER_PAGE === i + 1 || i === 0)
        return <Character ref={ref} character={char} />;
      return <Character character={char} />;
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
    toast({
      description: `Jumped to page ${page}`,
      status: "success",
      duration: 1500,
      isClosable: true,
    });
    fetchPreviousPage({ pageParam: page });
  };

  useEffect(() => {
    if (data) {
      const { pages, pageParams } = data;
      setMaxPages(pages.length > 0 ? pages[0].info.pages : 0);
    }
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
