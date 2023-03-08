import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { times } from "lodash";

type Props = {
  maxPages: number;
  maxPaginate?: number;
  toPage: (page: number) => void | null;
};

const Pagination = ({ maxPages, maxPaginate = 10, toPage }: Props) => {
  return (
    <Flex>
      <Box rounded={5} padding={5} bg="blackAlpha.300">
        <HStack>
          {times(maxPaginate, (page: number) => {
            const actualPage = page + 1;
            return (
              <Box key={`paginate-box-${actualPage}`}>
                <Button
                  onClick={() => toPage(actualPage)}
                  key={`paginate-${actualPage}`}
                >
                  {actualPage}
                </Button>
              </Box>
            );
          })}
        </HStack>
      </Box>
    </Flex>
  );
};

export default Pagination;
