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
          {user && user.isAdmin ? (
            <NavLink className="nav-button" to="/menuadmin">
              Menu
            </NavLink>
          ) : (
            <NavLink className="nav-button" to="/">
              Menu
            </NavLink>
          )}
        </div>
        <div className="nav-half">
          {localStorage.getItem("auth-token") ? (
            <>
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
              {user.isRestaurant ? (
                <NavLink className="nav-button" to="/orderres">
                  Order
                </NavLink>
              ) : (
                <NavLink className="nav-button" to="/orderuser">
                  Order
                </NavLink>
              )}
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


//how to import user collection from mongodb 