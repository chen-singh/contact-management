import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/contacts");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input placeholder="Email" required />
      <input type="password" placeholder="Password" required />

      <button type="submit">Login</button>

      <p>
        Don’t have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}

export default Login;
