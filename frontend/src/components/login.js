
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/apiaxious";
import "./Login.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


 const login = (e) => {
    e.preventDefault();


    if (email && password) {
      navigate("/contact");
    } else {
      alert("Please enter email and password");
    }
  };
  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={login}>
        <h2>Welcome Back</h2>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingEmail">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary btn-lg w-100 mb-3" type="submit">Login</button>

        <p className="text-center mb-0">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
