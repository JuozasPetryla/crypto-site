import classes from "./BaseCard.module.scss";
function BaseCard(props) {
  console.log(props.logo);
  return (
    <div className={"card shadow-sm " + classes["card-base"]}>
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
