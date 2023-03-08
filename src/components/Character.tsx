import { Card, CardBody } from "@chakra-ui/card";
import {
  Stack,
  Heading,
  Image,
  TableContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Flex,
  Tag,
} from "@chakra-ui/react";
import { startCase } from "lodash";
import { forwardRef } from "react";

import { RMCharacterI } from "../interfaces/interface";

const Character = forwardRef<any, any>(({ character }, ref) => {
  const { name, status, species, type, gender, image, origin }: RMCharacterI =
    character;
  const CharacterCard = () => {
    return (
      <Card
        shadow="md"
        rounded="md"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={image}
          alt={name}
        ></Image>
        <Stack spacing={2}>
          <CardBody>
            <Flex>
              <Heading paddingRight={2} size="md">
                {name}
              </Heading>
              <Tag
                variant="solid"
                colorScheme={
                  status === "Alive"
                    ? "green"
                    : status === "Dead"
                    ? "red"
                    : "gray"
                }
              >
                {startCase(status)}
              </Tag>
            </Flex>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Gender</Th>
                    <Th>Species</Th>
                    <Th>Type</Th>
                    <Th>Origin</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{gender}</Td>
                    <Td>{species}</Td>
                    <Td>{type ? type : "NA"}</Td>
                    <Td>{origin?.name ? origin?.name : "NA"}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Stack>
      </Card>
    );
  };

  const content = ref ? (
    <Box ref={ref}>
      <CharacterCard />
    </Box>
  ) : (
    <Box>
      <CharacterCard />
    </Box>
  );

  return content;
});

export default Character;
