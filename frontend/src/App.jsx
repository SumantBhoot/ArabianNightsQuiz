import QuizPage from "./pages/QuizPage";
import Login from "./pages/Auth/Login";
import Register from "./components/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <RequireAuth />,
        children: [{ path: "", element: <QuizPage /> }],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // add profile, leaderboard, create-quiz routes
]);

export default function App() {
  return <RouterProvider router={router} />;
}
