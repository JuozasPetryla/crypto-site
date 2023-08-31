import classes from "./BaseCard.module.scss";
function BaseCard(props) {
  return (
    <div className={"card " + classes["card-base"]}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.price}</p>
      </div>
    </div>
  );
}

export default BaseCard;
