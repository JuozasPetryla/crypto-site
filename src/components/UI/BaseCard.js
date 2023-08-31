import { useSelector } from "react-redux";

function BaseCard() {
  const cryptosList = useSelector((state) => state.cryptosSlice.cryptosList);
  console.log(cryptosList);
  return <div className="card" style="width: 20rem"></div>;
}

export default BaseCard