import { Link } from "react-router-dom";

function Navbar() {
  const isAuth = localStorage.getItem("isAuth");

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <h2 className="logo">💼 Smart Wallet</h2>

        <ul className="nav-links" role="list">
          <li><Link to="/">Home</Link></li>

          {isAuth && (
            <>
              <li><Link to="/home">Dashboard</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </>
          )}
        </ul>

        <div>
          {isAuth ? (
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;