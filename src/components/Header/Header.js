import "./Header.style.scss";
import { useRef } from "react";
import book from "../../assets/images/book.png";
import loupe from "../../assets/images/loupe.png";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

const Header = ({ onSearch }) => {
  const history = useHistory();
  const inputRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="header">
      <div className="header__logo" onClick={() => history.push("/")}>
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
          onClick={() => {
            onSearch(inputRef.current.value);
            history.push("/");
          }}
          className="header__searchbar__btn"
        >
          Search
        </button>
      </div>
      <div className="header__login">
        <input
          type="email"
          name="email"
          className="header__login__email"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          className="header__login__password"
          ref={passwordRef}
        />
        <button
          onClick={() => {
            auth
              .createUserWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value
              )
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
