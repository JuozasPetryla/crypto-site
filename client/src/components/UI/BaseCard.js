import { useDispatch } from "react-redux";
import { fetchOHLCV } from "../../app/cryptoSlice";
import classes from "./BaseCard.module.scss";
import { useNavigate } from "react-router";

function BaseCard(props) {
  const symbol = props.symbol.split("/")[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(fetchOHLCV(symbol)).then(() => {
      navigate(`crypto-chart/${symbol}`);
    });
  };
  return (
    <div
      className={"card shadow-sm " + classes["card-base"]}
      onClick={handleClick}
    >
      <div className={"card-body " + classes["card-body-text"]}>
        <h3 className="card-title">{props.name}</h3>
        <h5 className="card-title">{props.symbol}</h5>
        <p className="card-text">
          Price: <strong className={classes.price}>${props.price}</strong>
        </p>
      </div>
      <img src={props.logo} className={classes.image} />
    </div>
  );
}

export default BaseCard;
