import Header from "./components/layout/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCryptos } from "./app/cryptoSlice";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./views/MainPage";
import CryptoDetailPage from "./views/CryptoDetailPage";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/crypto-chart/:id", element: <CryptoDetailPage /> },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  return (
    <div>
      <Header></Header>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
