import "./App.css";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Spacer,
  Flex,
  Container,
  InputLeftAddon,
  InputGroup,
  Input,
  Center,
  Box,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <>
      <InputGroup>
        <InputLeftAddon children="Search"></InputLeftAddon>
        <Input type="string" />
      </InputGroup>
      <Box marginLeft={4}>
        <Button>
          <SearchIcon />
        </Button>
      </Box>
    </>
  );
};

// const Table = () => {
//     return()
// }

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.xl">
        <Flex h="10vh" py={4}>
          <Container>
            <Center>
              <SearchBar />
            </Center>
          </Container>
        </Flex>
        <Flex h="90vh">
          <Container>
            <Center></Center>
          </Container>
        </Flex>
      </Container>
    </ChakraProvider>
  );
}

export default App;
