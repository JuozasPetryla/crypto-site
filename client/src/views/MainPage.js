import BaseCard from "../components/UI/BaseCard";
import classes from "./MainPage.module.scss";
import { useSelector } from "react-redux";
import Pagination from "../components/layout/Pagination";

function MainPage() {
  const cryptosList = useSelector((state) => state.crypto.cryptosList);
  return (
    <div className={classes["main-page"]}>
      <h1 className={classes.title}>CryptoCheck.com</h1>
      {cryptosList.map((crypto) => (
        <BaseCard
          symbol={crypto?.symbol}
          key={crypto?.symbol}
          name={crypto?.name}
          price={crypto?.last}
          logo={crypto?.logoUrl ?? ""}
        ></BaseCard>
      ))}
      <Pagination className={classes.pagination} />
    </div>
  );
}

export default MainPage;
