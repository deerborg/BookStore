import { BrowserRouter, Link, Route } from "react-router-dom";
import Author from "../Author/Author";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>MANAGEMENT</h1>
      </div>
      <div className="navs">
        <Link to="/">Home</Link>
        <Link to="/author">Author</Link>
        <Link to="/publisher">Publisher</Link>
        <Link to="/category">Categories</Link>
        <Link to="/book">Book</Link>
        <Link to="/borrow">Borrow</Link>
      </div>
    </nav>
  );
};
export default Navbar;
