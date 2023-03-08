import { Box, Button, Flex, HStack, SlideFade } from "@chakra-ui/react";
import { times } from "lodash";

type Props = {
  maxPages: number;
};

const Pagination = ({ maxPages }: Props) => {
  return (
    <Flex>
      <HStack>
        {times(maxPages, (x: number) => {
          const page = x + 1;
          return (
            <Box key={`paginate-box-${page}`}>
              <Button key={`paginate-${page}`}>{page}</Button>
            </Box>
          );
        })}
      </HStack>
    </Flex>
  );
};

export default Pagination;
