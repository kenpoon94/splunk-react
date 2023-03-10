import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { times } from "lodash";

// Scenario and flow
// 1. Page 1 loads and user scroll as usual
// 2. Page 1 loads and user decides to paginate to page 5
//    - Remove all data and start from scratch
//      - Load and jump to page 5
//      - Use intersectionObserver to do two way infinite query + scrolling
//    - Retain previously loaded data
//      - Load and jump to page 5
//      - Use intersectionObserver to do two way infinite query + scrolling ; at the same time maintaining the array order
// 3. Page 1 loads and user decides to use arrow keys to paginate
//    - Should operate as (1) scenario except jump page by page + loading

type Props = {
  maxPages: number;
  maxPaginate?: number;
  toPage: (page: number) => void;
  toNextPage: () => void;
  toPrevPage: () => void;
};

const Pagination = ({
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
          {/* <Box
            key="paginate-box-prev"
            hidden={currentPage === 1}
            onClick={toPrevPage}
          >
            <Button key={`paginate-btn-prev`}>{"<"}</Button>
          </Box> */}
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
          {/* <Box key="paginate-box-after">
            <Button
              key={`paginate-btn-after`}
              hidden={currentPage < maxPages}
              onClick={toNextPage}
            >
              {">"}
            </Button>
          </Box> */}
        </HStack>
      </Box>
    </Flex>
  );
};

export default Pagination;
