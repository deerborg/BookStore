import { BrowserRouter, Link, Route } from "react-router-dom";
import Auhtor from "../Author/Author";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>LIBRARY</h1>
      </div>
      <div className="navs">
        <Link to="/">Home</Link>
        <Link to="/publisher">Publisher</Link>
        <Link to="/author">Author</Link>
        <Link to="/category">Categories</Link>
        <Link to="/book">Book</Link>
        <a href="#">Borrowing</a>
      </div>
    </nav>
  );
};
export default Navbar;
