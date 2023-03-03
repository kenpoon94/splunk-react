import "../App.css";
import { SearchIcon } from "@chakra-ui/icons";
import {
  InputLeftAddon,
  InputGroup,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const handleChange = (event: { target: { value: SetStateAction<string> } }) =>
    setValue(event.target.value);

  return (
    <>
      <InputGroup>
        <InputLeftAddon children="Search"></InputLeftAddon>
        <Input disabled type="string" value={value} onChange={handleChange} />
      </InputGroup>
      <Box marginLeft={4}>
        <Button>
          <SearchIcon />
        </Button>
      </Box>
    </>
  );
};
