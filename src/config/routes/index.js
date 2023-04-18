import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  MainApp,
  BarangKeluar,
  BarangMasuk,
} from "../../pages";
import { Dashboard } from "../../components/organisme";
const isLogin = sessionStorage.getItem("isLogin");
const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin === "true" ? <MainApp /> : <Login />,
      children: [
        {
          path: "/home",
          element: isLogin === "true" ? <Home /> : <Login />,
          children: [
            {
              path: "/home",
              element: isLogin === "true" ? <Dashboard /> : <Login />,
            },
            {
              path: "/home/barangMasuk/:id",
              element: isLogin === "true" ? <BarangMasuk /> : <Login />,
            },
            {
              path: "/home/barangKeluar/:id",
              element: isLogin === "true" ? <BarangKeluar /> : <Login />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
