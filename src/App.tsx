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
import { VTable } from "./Table";
import { SetStateAction, useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const handleChange = (event: { target: { value: SetStateAction<string> } }) =>
    setValue(event.target.value);

  return (
    <>
      <InputGroup>
        <InputLeftAddon children="Search"></InputLeftAddon>
        <Input type="string" value={value} onChange={handleChange} />
      </InputGroup>
      <Box marginLeft={4}>
        <Button>
          <SearchIcon />
        </Button>
      </Box>
    </>
  );
};

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.xl">
        <Flex py={4}>
          <Container>
            <Center>
              <SearchBar />
            </Center>
          </Container>
        </Flex>
        <Flex>
          <Container>
            <Center>
              <VTable />
            </Center>
          </Container>
        </Flex>
      </Container>
    </ChakraProvider>
  );
}

export default App;
