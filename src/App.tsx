import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { HomePage } from "./HomePage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
