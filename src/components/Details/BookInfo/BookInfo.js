import "./BookInfo.style.scss";

export const BookInfo = () => {
  return (
    <div className="info">
      <div className="info__general">
        <div className="info__general__titleImg">
          <p className="info__general__titleImg__title"></p>
          <img
            src=""
            alt="bookCover"
            className="info__general__titleImg__img"
          />
        </div>

        <div className="info__general__other">
          <div className="info__general__other__like">
            <p className="info__general__other__like__star"></p>
            <img
              src=""
              alt="addToFavsImage"
              className="info__general__other__like__addFavImg"
            />
            <p className="info__general__other__like__addFavText">
              Add To Favorites
            </p>
          </div>

          <div className="info__general__other__primary">
            <p className="info__general__other__primary__author"></p>
            <p className="info__general__other__primary__publisher"></p>
            <p className="info__general__other__primary__publishedDate"></p>
            <span className="info__general__other__primary__printType"></span>
            <span className="info__general__other__primary__category"></span>
            <span className="info__general__other__primary__pageCount"></span>
            <span className="info__general__other__primary__language"></span>
          </div>

          <div className="info__general__other__secondary">
            <p className="info__general__other__secondary__price"></p>
            <button className="info__general__other__secondary__buy"></button>
            <button className="info__general__other__secondary__download"></button>
            <button className="info__general__other__secondary__view"></button>
          </div>
        </div>
      </div>

      <div className="info__description"></div>
    </div>
  );
};
