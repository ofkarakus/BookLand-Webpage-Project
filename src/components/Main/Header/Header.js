import "./Header.style.scss";
import book from "../../../assets/images/book.png";
import loupe from "../../../assets/images/loupe.png";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img src={book} alt="logo_image" className="header__logo__img" />
        <p className="header__logo__name">BookLand</p>
      </div>
      <div className="header__searchbar">
        <img
          src={loupe}
          alt="search_icon"
          className="header__searchbar__icon"
        />
        <input
          type="text"
          className="header__searchbar__input"
          placeholder="Which book are you looking for?"
        />
        <button className="header__searchbar__btn">Search</button>
      </div>
      <div className="header__login">LOGIN</div>
    </div>
  );
};
