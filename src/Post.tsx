import { Card, CardBody, CardHeader, CardFooter } from "@chakra-ui/card";
import { Heading, Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { AddIcon } from "@chakra-ui/icons";
type PostI = { id: string; title: string; body: string };

const Post = forwardRef<any, any>(({ post }, ref) => {
  const { id, title, body }: PostI = post;
  const postBody = (
    <Card>
      <CardHeader>
        <Heading size="sm">{`${title} : ${id}`}</Heading>
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
