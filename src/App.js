import Header from "./components/layout/Header";
import MainPage from "./views/MainPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCryptos, fetchCryptosInfo } from "./app/cryptoSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCryptosInfo());
  }, [dispatch]);

  return (
    <div className="App">
      <Header></Header>
      <MainPage></MainPage>
    </div>
  );
}

export default App;
