import Header from "./components/layout/Header";
import MainPage from "./views/MainPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCryptos } from "./app/cryptoSlice";

function App() {
  const dispatch = useDispatch();
  const cryptosList = useSelector((state) => state.crypto.cryptosList);

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  console.log(cryptosList);
  return (
    <div className="App">
      <Header></Header>
      <MainPage></MainPage>
    </div>
  );
}

export default App;
