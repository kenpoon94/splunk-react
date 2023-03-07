import "./App.css";
import { Flex, Container, Center } from "@chakra-ui/react";
import Pagination from "./components/Pagination";
import { Hide } from "./components/Hide";
import Nav from "./components/Nav";

const HomePage = () => {
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
          <Center>{/* TODO: <Posts /> */}</Center>
        </Container>
      </Flex>
    </Container>
  );
};

export default HomePage;
