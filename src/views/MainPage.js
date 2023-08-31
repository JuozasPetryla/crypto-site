import BaseCard from "../components/UI/BaseCard";
import classes from "./MainPage.module.scss";
import { useSelector } from "react-redux";

function MainPage() {
  const cryptosList = useSelector((state) => state.crypto.cryptosList);
  return (
    <div className={classes["main-page"]}>
      {cryptosList.map((crypto) => (
        <BaseCard
          title={crypto?.symbol}
          key={crypto?.symbol}
          price={crypto?.ask}
        ></BaseCard>
      ))}
    </div>
  );
}

export default MainPage;
