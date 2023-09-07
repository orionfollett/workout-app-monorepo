import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { Nav } from "./components/nav/nav";

import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Track } from "./components/track/track";
import { ViewWorkout } from "./components/track/workout";
import { Plan } from "./components/plan/plan";
import { Analyze } from "./components/analyze/analyze";

const client = new Client({
  url: "http://127.0.0.1:8000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav></Nav>,
    children: [
      { path: "/track", element: <Track></Track> },
      { path: "/plan", element: <Plan></Plan> },
      { path: "/analyze", element: <Analyze></Analyze> },
    ],
  },
  //  { path: "/workout/:id", element: <ViewWorkout workoutId={}></ViewWorkout> },
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
