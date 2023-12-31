import CryptoChart from "../components/crypto/CryptoChart";
import classes from "./CryptoDetailPage.module.scss";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchOHLCV } from "../app/cryptoSlice";
import { useEffect, useState } from "react";

function CryptoDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [granularity, setGranularity] = useState(300);
  const [longTime, setLongTime] = useState(false);

  function onChangeGranularity(gran, longTime) {
    setLongTime(longTime);
    setGranularity(gran);
  }

  useEffect(() => {
    dispatch(fetchOHLCV({ symbol: params.id, granularity, longTime }));
  }, [dispatch, granularity, params.id, longTime]);

  return (
    <div className={classes.main}>
      <h2>{params.id}/USD chart</h2>
      <ul className={classes["btn-list"]}>
        <li>
          <button
            onClick={() => onChangeGranularity(300, false)}
            type="button"
            className={"btn " + classes.button}
          >
            1H
          </button>
        </li>

        <li>
          <button
            onClick={() => onChangeGranularity(900, false)}
            type="button"
            className={"btn " + classes.button}
          >
            1D
          </button>
        </li>
        <li>
          <button
            onClick={() => onChangeGranularity(3600, false)}
            type="button"
            className={"btn " + classes.button}
          >
            1W
          </button>
        </li>
        <li>
          <button
            onClick={() => onChangeGranularity(21600, false)}
            type="button"
            className={"btn " + classes.button}
          >
            1M
          </button>
        </li>
        <li>
          <button
            onClick={() => onChangeGranularity(86400, "3months")}
            type="button"
            className={"btn " + classes.button}
          >
            3M
          </button>
        </li>
        <li>
          <button
            onClick={() => onChangeGranularity(86400, "6months")}
            type="button"
            className={"btn " + classes.button}
          >
            6M
          </button>
        </li>
        <li>
          <button
            onClick={() => onChangeGranularity(86400, "all")}
            type="button"
            className={"btn " + classes.button}
          >
            All
          </button>
        </li>
      </ul>
      <div className={"card " + classes["card-base"]}>
        <CryptoChart></CryptoChart>
      </div>
    </div>
  );
}

export default CryptoDetailPage;
