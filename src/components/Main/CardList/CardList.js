import "./CardList.style.scss";
import Card from "../Card/Card";

export const CardList = ({ cardListBookData, queryData }) => {
  return (
    <div className="cardlist">
      {queryData
        ? queryData.map((item, i) => <Card key={i} item={item} />)
        : cardListBookData?.map((item, i) => <Card key={i} item={item} />)}
    </div>
  );
};
