import Header from "./components/layout/Header";
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
    </div>
  );
}

export default App;
