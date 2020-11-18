import React from "react";
import "./Card.style.scss";
import star from "../../../assets/images/star.png";
import starOutline from "../../../assets/images/star-outline.png";
import bookDefault from "../../../assets/images/book-default.png";

export default function Card({ item }) {
  const rating = Array(
    Math.floor(
      item?.volumeInfo?.averageRating ? item.volumeInfo.averageRating : 0
    )
  ).fill("star");

  const emptyStar = Array(Math.floor(5 - rating.length)).fill("star");

  return (
    <div className="card">
      <img
        src={
          item?.volumeInfo?.imageLinks?.thumbnail
            ? item.volumeInfo.imageLinks.thumbnail
            : bookDefault
        }
        alt={item?.volumeInfo?.title}
        className="card__img"
      />
      <div className="card__rating">
        {rating.map((str) => (
          <img src={star} alt="rating" className="card__rating__star" />
        ))}
        {emptyStar.map((str) => (
          <img src={starOutline} alt="rating" className="card__rating__star" />
        ))}
      </div>
      <p className="card__title">{item.volumeInfo.title}</p>
      <p className="card__authors">
        {item?.volumeInfo?.authors?.join(' - ')}
      </p>
      <p className="card__publisher">{item.volumeInfo.publisher}</p>
      <div className="card__price">
        <p className="card__price__amount">
          {item.saleInfo.listPrice
            ? `${item.saleInfo.listPrice.amount} ${item.saleInfo.listPrice.currencyCode}`
            : item.saleInfo.saleability}
        </p>
      </div>
    </div>
  );
}
