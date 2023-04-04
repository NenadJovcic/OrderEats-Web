import "../../styles/navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="nav-bar">
        <div className="nav-half">
          <h1 className="nav-logo">Food Delivery</h1>
          <NavLink className="nav-button" to="/">
            Menu
          </NavLink>
        </div>
        <div className="nav-half">
          <NavLink className="nav-button" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-button" to="/signup">
            Signup
          </NavLink>
          <NavLink className="nav-button" to="/orderuser">
            Order
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
