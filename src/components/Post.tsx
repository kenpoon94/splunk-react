import { Card, CardBody, CardHeader, CardFooter } from "@chakra-ui/card";
import { Stack, Heading, Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { AddIcon } from "@chakra-ui/icons";

import { PostI } from "../interfaces/interface";

const Post = forwardRef<any, any>(({ post }, ref) => {
  const { id, title, body }: PostI = post;
  const postBody = (
    <Card>
      <CardHeader>
        <Stack spacing={2}>
          <Heading size="sm">{`Post ID: ${id}`}</Heading>
          <Heading size="md">{title}</Heading>
        </Stack>
      </CardHeader>
      <CardBody>
        <Text>{body}</Text>
      </CardBody>
    </Card>
  );

  const content = ref ? (
    <article ref={ref}>{postBody}</article>
  ) : (
    <article>{postBody}</article>
  );

  return content;
});

export default Post;
