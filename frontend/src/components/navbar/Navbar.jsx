import "../../styles/navbar.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem("user"));
    setUser(tempUser);
  }, []);

  function handleLogout() {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    location.assign("/login");
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
          {user && user.isAdmin === true && (
            <>
              <NavLink className="nav-button" to="/orderres">
                Income Orders
              </NavLink>
              <NavLink className="nav-button" to="/menuadmin">
                Admin panel
              </NavLink>
              <NavLink className="nav-button" to="/orderuser">
                Order user
              </NavLink>
            </>
          )}
          {!user ? (
            <>
              <NavLink className="nav-button" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-button" to="/signup">
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
              <NavLink className="nav-button" to="/orderuser">
                Cart
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

//how to import user collection from mongodb
