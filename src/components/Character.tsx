import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Stack, Heading, Text } from "@chakra-ui/react";
import { forwardRef } from "react";

import { RMCharacterI } from "../interfaces/interface";

const Character = forwardRef<any, any>(({ character }, ref) => {
  const { id, name, status, species, type, gender }: RMCharacterI = character;
  const postBody = (
    <Card shadow="md" rounded="md">
      <CardHeader>
        <Stack spacing={2}>
          <Heading size="sm">{`Character ID: ${id}`}</Heading>
          <Heading size="md">{name}</Heading>
        </Stack>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );

  const content = ref ? (
    <article ref={ref}>{postBody}</article>
  ) : (
    <article>{postBody}</article>
  );

  return content;
});

export default Character;
