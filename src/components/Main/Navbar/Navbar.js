import "./Navbar.style.scss";

export const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar__list">
        <li className="navbar__list__books">Books</li>
        <li className="navbar__list__magazines">Magazines</li>
        <li className="navbar__list__ebooks">Ebooks</li>
      </ul>
    </div>
  );
};
