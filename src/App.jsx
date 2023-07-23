import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import ProductDetailsDesktop from "./components/ProductDetailsDesktop";
import NavbarMobile from "./components/NavbarMobile";
import NavbarDesktop from "./components/NavbarDesktop";
import "./App.css";
import ProductListMobile from "./components/ProductListMobile";
import ProductListDesktop from "./components/ProductListDesktop";
import ProductDetailsMobile from "./components/ProductDetailsMobile";
import React from "react";

const LayoutForMobile = () => {
  return (
    <div className="app">
      <NavbarMobile />
      <Outlet />
    </div>
  );
};
const LayoutForDesktop = () => {
  return (
    <div className="app">
      <NavbarDesktop />
      <Outlet />
    </div>
  );
};

const routerForDesktop = createBrowserRouter([
  {
    path: "/",
    element: <LayoutForDesktop />,
    children: [
      {
        path: "/",
        element: <ProductListDesktop />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsDesktop />,
      },
    ],
  },
]);
const routerForMobile = createBrowserRouter([
  {
    path: "/",
    element: <LayoutForMobile />,
    children: [
      {
        path: "/",
        element: <ProductListMobile />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsMobile />,
      },
    ],
  },
]);

const App = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <RouterProvider router={isMobile ? routerForMobile : routerForDesktop} />
  );
};

export default App;
