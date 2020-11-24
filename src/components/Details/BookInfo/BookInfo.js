import "./BookInfo.style.scss";
import like from "../../../assets/images/like.png";
import likeOutline from "../../../assets/images/like-outline.png";
import { useState, useContext, useEffect } from "react";
import star from "../../../assets/images/star.png";
import starOutline from "../../../assets/images/star-outline.png";
import bookDefault from "../../../assets/images/book-default.png";
import { Context } from "../../../App";

export const BookInfo = ({ item }) => {

  const {
    hasSession,
    favorites,
    createFavorites,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
  } = useContext(Context);

  const [isLiked, setLiked] = useState(false);

  useEffect(() => {
    getFavorites()
  }, []);


  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const rating = Array(
    Math.floor(
      item?.volumeInfo?.averageRating ? item.volumeInfo.averageRating : 0
    )
  ).fill("star");

  const emptyStar = Array(Math.floor(5 - rating.length)).fill("star");

  return (
    <div className="info">
      <div className="info__general">
        <div className="info__general__titleImg">
          <p className="info__general__titleImg__title">
            {item.volumeInfo.title}
          </p>
          {item.volumeInfo.imageLinks?.thumbnail ? (
            <img
              src={item.volumeInfo.imageLinks.thumbnail}
              alt="bookCover"
              className="info__general__titleImg__img"
            />
          ) : (
            <img
              src={bookDefault}
              alt="bookCover"
              className="info__general__titleImg__img"
            />
          )}
          <div className="info__general__titleImg__rating">
            {rating.map((str) => (
              <img
                src={star}
                alt="rating"
                className="info__general__titleImg__rating__star"
              />
            ))}
            {emptyStar.map((str) => (
              <img
                src={starOutline}
                alt="rating"
                className="info__general__titleImg__rating__star"
              />
            ))}
          </div>
        </div>

        <div className="info__general__other">
          {hasSession ? (
            <div className="info__general__other__like">
              {isLiked ? (
                <p className="info__general__other__like__addFavText">
                  <span>Remove</span>
                  <span>From</span>
                  <span>Favorites</span>
                </p>
              ) : (
                <p className="info__general__other__like__addFavText">
                  <span>Add</span>
                  <span>To</span>
                  <span>Favorites</span>
                </p>
              )}
              {isLiked ? (
                <img
                  onClick={() => {
                    setLiked((prevState) => !prevState);
                    removeFromFavorites(item);
                  }}
                  src={like}
                  alt="addToFavsImage"
                  className="info__general__other__like__addFavImg"
                />
              ) : (
                <img
                  onClick={() => {
                    setLiked((prevState) => !prevState);
                    favorites
                      ? addToFavorites(item)
                      : // console.log('add')
                        createFavorites(item);
                    // console.log('create')
                  }}
                  src={likeOutline}
                  style={{ backgroundColor: "white" }}
                  alt="addToFavsImage"
                  className="info__general__other__like__addFavImg"
                />
              )}
            </div>
          ) : null}

          <div>
            <table className="info__general__other__primary">
              <tr className="info__general__other__primary__author">
                <td>Author:</td>
                <td>{item.volumeInfo.authors?.join(" - ")}</td>
              </tr>
              <tr className="info__general__other__primary__publisher">
                <td>Publisher:</td>
                <td>{item.volumeInfo.publisher}</td>
              </tr>
              <tr className="info__general__other__primary__publishedDate">
                <td>Published Date:</td>
                <td> {item.volumeInfo.publishedDate}</td>
              </tr>
              <tr className="info__general__other__primary__printType">
                <td>Print Type:</td>
                <td>{capitalize(item.volumeInfo.printType)}</td>
              </tr>
              <tr className="info__general__other__primary__category">
                <td>Category:</td>
                <td>
                  {item.volumeInfo.categories?.map((category) => (
                    <span> {category}</span>
                  ))}
                </td>
              </tr>
              <tr className="info__general__other__primary__pageCount">
                <td>Page Count:</td>
                <td>
                  {item.volumeInfo.pageCount ? item.volumeInfo.pageCount : null}
                </td>
              </tr>
              <tr className="info__general__other__primary__language">
                <td>Language:</td>
                <td>{item.volumeInfo.language.toUpperCase()}</td>
              </tr>
            </table>
          </div>

          <div className="info__general__other__secondary">
            {item.saleInfo?.listPrice ? (
              <p className="info__general__other__secondary__price">
                <span style={{ fontWeight: "normal" }}>Price: </span>
                {item.saleInfo.listPrice.amount}{" "}
                {item.saleInfo.listPrice.currencyCode}
              </p>
            ) : (
              <p className="info__general__other__secondary__price">
                {item.saleInfo.saleability
                  .split("_")
                  .map((word) => capitalize(word))
                  .join(" ")}
              </p>
            )}
            {item.saleInfo.saleability !== "NOT_FOR_SALE" ? (
              <a href={item.saleInfo.buyLink} target="_">
                <button className="info__general__other__secondary__buy">
                  Buy
                </button>
              </a>
            ) : null}
            {item.accessInfo.epub.isAvailable ||
            item.accessInfo.pdf.isAvailable ? (
              <a
                href={
                  item.accessInfo.epub.isAvailable
                    ? item.accessInfo.epub.acsTokenLink
                    : item.accessInfo.pdf.acsTokenLink
                }
              >
                <button className="info__general__other__secondary__download">
                  Download
                </button>
              </a>
            ) : null}
            {item.accessInfo.viewability !== "NO_PAGES" ? (
              <a href={item.accessInfo.webReaderLink} target="_">
                <button className="info__general__other__secondary__view">
                  View
                </button>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="info__description">
        <p className="info__description__text">{item.volumeInfo.description}</p>
      </div>
    </div>
  );
};
