import "../../styles/navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <>
      <nav className="nav-nav">
        <div className="nav-half">
          <h1>framtida logo</h1>
          <Link to={'/'}>Menu</Link>
        </div>
        <div className="nav-half">
          <Link to={'/login'}>Login</Link>
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/orderuser'}>Order</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
