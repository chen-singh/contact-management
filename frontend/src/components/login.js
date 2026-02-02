
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/apiaxious";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // save user in localStorage (mock login)

  //   localStorage.setItem("user", JSON.stringify({ name: "John Doe", email }));
  //   navigate("/contacts");
  // };
 const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/Contact";
  };
  return (
    <div className="container mt-5">
      <form className="card p-4 mx-auto" style={{ maxWidth: "400px" }} onSubmit={login}>
        <h3 className="text-center mb-3">Login</h3>
        <input type="email" className="form-control mb-2" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100 mb-2" type="submit">Login</button>
        <p className="text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
