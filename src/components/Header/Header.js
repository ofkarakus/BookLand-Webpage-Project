import "./Header.style.scss";
import { useRef } from "react";
import book from "../../assets/images/book.png";
import loupe from "../../assets/images/loupe.png";
import { useHistory } from "react-router-dom";

const Header = ({ onSearch }) => {
  const history = useHistory();
  const inputRef = useRef();

  return (
    <div className="header">
      <div className="header__logo" onClick={() => history.push('/')}>
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
          ref={inputRef}
          // onChange={e => onSearch(e.target.value)}
          type="text"
          className="header__searchbar__input"
          placeholder="Which book are you looking for?"
        />
        <button
          onClick={() => { onSearch(inputRef.current.value); history.push('/');}}
          className="header__searchbar__btn"
        >
          Search
        </button>
      </div>
      <div className="header__login">
        LOGIN
      </div>
    </div>
  );
};

export default Header;
