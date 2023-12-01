import { Navigate, createBrowserRouter } from "react-router-dom";
import Accomodations from "@pages/Accomodations";
import AuthLayout from "@layouts/AuthLayout";
import Chill from "@/pages/Chill";
import Details from "./pages/Details";
import Events from "@pages/Events";
import Home from "@pages/Home";
import HomeLayout from "@layouts/HomeLayout";
import Map from "@pages/Map";
import Signin from "@pages/Signin";
import Signup from "@pages/Signup";
import Payment from "./pages/Payment";
import User from "./pages/User";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/home/main" />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/home/main" />,
      },
      {
        path: "main",
        element: <Home />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "chill",
        element: <Chill />,
      },
      {
        path: "accomodations",
        element: <Accomodations />,
      },
      {
        path: "map",
        element: <Map width={1200} height={500} />,
      },
      {
        path: "details/:placeType/:id",
        element: <Details />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/auth/signin" />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
