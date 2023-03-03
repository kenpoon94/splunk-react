import "./App.css";
import { Flex, Container, Center } from "@chakra-ui/react";
import InfiniteScroll from "./components/InfiniteScroll";
import RQInfiniteScroll from "./components/RQInfiniteScroll";
import { SearchBar } from "./components/SearchBar";

export const HomePage = () => {
  return (
    <Container maxW="container.xl">
      <Nav />
      <Body />
    </Container>
  );
};

const Nav = () => {
  return (
    <Flex py={4}>
      <Container>
        <Center>
          <SearchBar />
        </Center>
      </Container>
    </Flex>
  );
};

const Body = () => {
  return (
    <Flex>
      <Container>
        <Center>
          {/* <InfiniteScroll></InfiniteScroll> */}
          <RQInfiniteScroll></RQInfiniteScroll>
        </Center>
      </Container>
    </Flex>
  );
};
