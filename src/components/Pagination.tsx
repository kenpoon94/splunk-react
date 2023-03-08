import { Box, Button, Flex, HStack, SlideFade } from "@chakra-ui/react";
import { times } from "lodash";

type Props = {
  maxPages: number;
  toPage: (page: number) => void | null;
};

const Pagination = ({ maxPages, toPage }: Props) => {
  return (
    <Flex>
      <Box rounded={5} padding={5} bg="blackAlpha.300">
        <HStack>
          {times(maxPages, (page: number) => {
            const actualPage = page++;
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
