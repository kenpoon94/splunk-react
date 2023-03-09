import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { times } from "lodash";

type Props = {
  currentPage: number;
  maxPages: number;
  maxPaginate?: number;
  toPage: (page: number) => void;
  toNextPage: () => void;
  toPrevPage: () => void;
};

const Pagination = ({
  currentPage,
  maxPages,
  maxPaginate = 10,
  toPage,
  toNextPage,
  toPrevPage,
}: Props) => {
  return (
    <Flex>
      <Box rounded={5} padding={5} bg="blackAlpha.300">
        <HStack>
          <Box
            key="paginate-box-prev"
            hidden={currentPage === 1}
            onClick={toPrevPage}
          >
            <Button key={`paginate-btn-prev`}>{"<"}</Button>
          </Box>
          {times(maxPaginate, (page: number) => {
            const actualPage = page + 1;
            return (
              <Box key={`paginate-box-${actualPage}`}>
                <Button
                  onClick={() => toPage(actualPage)}
                  key={`paginate-btn-${actualPage}`}
                >
                  {actualPage}
                </Button>
              </Box>
            );
          })}
          <Box key="paginate-box-after">
            <Button
              key={`paginate-btn-after`}
              hidden={currentPage < maxPages}
              onClick={toNextPage}
            >
              {">"}
            </Button>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Pagination;
