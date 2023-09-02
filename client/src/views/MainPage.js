import BaseCard from "../components/UI/BaseCard";
import classes from "./MainPage.module.scss";
import { useSelector } from "react-redux";

function MainPage() {
  const cryptosList = useSelector((state) => state.crypto.cryptosList);
  const cryptosInfoList = useSelector((state) => state.crypto.cryptosInfoList);
  console.log(cryptosList);
  console.log(cryptosInfoList);
  return (
    <div className={classes["main-page"]}>
      {cryptosList.map((crypto) => (
        <BaseCard
          symbol={crypto?.symbol}
          key={crypto?.symbol}
          name={
            cryptosInfoList.find(
              (cryptoInfo) => cryptoInfo.id === crypto?.symbol.split("/")[0]
            )?.name
          }
          price={crypto?.last}
          logo={
            cryptosInfoList.find(
              (cryptoInfo) => cryptoInfo.id === crypto?.symbol.split("/")[0]
            )?.logoUrl ?? ""
          }
        ></BaseCard>
      ))}
    </div>
  );
}

export default MainPage;
