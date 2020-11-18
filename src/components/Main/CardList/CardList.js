import "./CardList.style.scss";
import Card from "../Card/Card";

export const CardList = ({ cardListBookData }) => {
  console.log("card: ", cardListBookData);
  return (
    <div className="cardlist">
      {cardListBookData?.map((item, i) => <Card key={i} item={item} />)}
    </div>
  );
};
