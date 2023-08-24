import {  CssBaseline, CssVarsProvider } from "@mui/joy";
import { Nav } from "./components/nav/nav";



import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const client = new Client({url: 'http://127.0.0.1:8000/graphql', exchanges: [cacheExchange, fetchExchange]});


export default function App() {
  return <CssVarsProvider>
    <CssBaseline/>
    <main>
      <Provider value={client}>
      <Nav></Nav>
    </Provider>
    </main>
  </CssVarsProvider>;
}