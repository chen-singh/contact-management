import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/contacts");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input placeholder="Name" required />
      <input placeholder="Email" required />
      <input type="password" placeholder="Password" required />

      <button type="submit">Register</button>

      <p>
        Already have an account?{" "}
        <Link to="/">Login here</Link>
      </p>
    </form>
  );
}

export default Register;
