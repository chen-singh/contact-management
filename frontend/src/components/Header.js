import { useNavigate, Link } from "react-router-dom";
import "./header.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("contacts");
    navigate("/");
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-lg">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand custom-brand" to="/contacts">
          📇 Contact Manager
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">

            <Link to="/profile" className="text-decoration-none">
              <button className="profile-btn">
                👤 Profile
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              🔐 Logout
            </button>

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
