import "../../styles/navbar.css";
import { NavLink } from "react-router-dom";


const Navbar = () => {


  function handleLogout() {
    localStorage.removeItem("auth-token");
    location.assign('/login')

  }
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
          {localStorage.getItem("auth-token") ? (
            <>
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
              <NavLink className="nav-button" to="/orderuser">
                Order
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="nav-button" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-button" to="/signup">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
