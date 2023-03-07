import { Flex, Container, Center } from "@chakra-ui/layout";
import { SearchBar } from "./SearchBar";

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
export default Nav;
