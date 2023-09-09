import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { Nav } from "./components/nav/nav";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { Analyze } from "./components/analyze/analyze";
import { Plan } from "./components/plan/plan";
import { Track } from "./components/track/track";
import { ViewWorkout } from "./components/track/workout";

const client = new Client({
  url: "http://127.0.0.1:8000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav></Nav>,
    children: [
      {
        path: "/track",
        element: <Track></Track>,
      },
      { path: "/plan", element: <Plan></Plan> },
      { path: "/analyze", element: <Analyze></Analyze> },
      {
        path: "/workout/:id",
        element: <ViewWorkout></ViewWorkout>,
      },
    ],
  },
]);
export default function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <main>
        <Provider value={client}>
          <RouterProvider router={router} />
        </Provider>
      </main>
    </CssVarsProvider>
  );
}
