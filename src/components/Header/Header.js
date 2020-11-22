import "./Header.style.scss";
import { useRef, useState } from "react";
import book from "../../assets/images/book.png";
import loupe from "../../assets/images/loupe.png";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "3rem",
    backgroundColor: "rgba(0, 34, 52, 0.7)",
    borderRadius: "3rem",
  },
};

Modal.setAppElement("#root");

const Header = ({ onSearch }) => {
  const history = useHistory();

  const queryRef = useRef();
  const signInEmailRef = useRef();
  const signInPasswordRef = useRef();
  const signUpEmailRef = useRef();
  const signUpPasswordRef = useRef();
  const signUpConfirmRef = useRef();

  const [modalFlag, setModalFlag] = useState(false);

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
          ref={queryRef}
          // onChange={e => onSearch(e.target.value)}
          type="text"
          className="header__searchbar__input"
          placeholder="Which book are you looking for?"
        />
        <button
          onClick={() => {
            onSearch(queryRef.current.value);
            history.push("/");
          }}
          className="header__searchbar__btn"
        >
          Search
        </button>
      </div>
      <div className="header__login">
        <button
          className="header__login__btn"
          onClick={() => setModalFlag(true)}
        >
          Sign In / Sign Up
        </button>
      </div>
      <Modal
        isOpen={modalFlag}
        onRequestClose={() => setModalFlag(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="header__signin">
          <p className="header__signin__text">Sign In</p>
          <input
            placeholder="Type your email.."
            type="email"
            name="email"
            className="header__signin__email"
            ref={signInEmailRef}
          />
          <input
            placeholder="Type your password.."
            type="password"
            name="password"
            className="header__signin__password"
            ref={signInPasswordRef}
          />
          <button
            className="header__signin__btn"
            onClick={() => {
              auth
                .signInWithEmailAndPassword(
                  signInEmailRef.current.value,
                  signInPasswordRef.current.value
                )
                .then(() => alert("You successfully signed in."))
                .catch((err) => alert(err.message));
            }}
          >
            Sign In
          </button>
        </div>

        <p className="header__or">OR</p>

        <div className="header__signup">
          <p className="header__signup__text">Sign Up</p>
          <input
            placeholder="Type your email.."
            type="email"
            name="email"
            className="header__signup__email"
            ref={signUpEmailRef}
          />
          <input
            placeholder="Type your password.."
            type="password"
            name="password"
            className="header__signup__password"
            ref={signUpPasswordRef}
          />
          <input
            placeholder="Confirm your password.."
            type="password"
            name="password"
            className="header__signup__password"
            ref={signUpConfirmRef}
          />
          <button
            className="header__signup__btn"
            onClick={() => {
              if (
                signUpPasswordRef.current.value ===
                signUpConfirmRef.current.value
              ) {
                auth
                  .createUserWithEmailAndPassword(
                    signUpEmailRef.current.value,
                    signUpPasswordRef.current.value
                  )
                  .then(() => alert("You successfully signed in."))
                  .catch((err) => alert(err.message));
              } else {
                alert("Those passwords didn't match. Try again.");
              }
            }}
          >
            Sign Up
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
