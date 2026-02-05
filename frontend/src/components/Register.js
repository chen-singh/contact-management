
import { useState  } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/apiaxious";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 
    const register = async (e) => {
      e.preventDefault();
    try {
      await api.post("/auth/register", {name, email, password });
      alert("✅ Registration successful. You can login now.");
      navigate("/login")
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <form className="card p-4 mx-auto" style={{ maxWidth: "400px" }} onSubmit={register}>
        <h3 className="text-center mb-3">Register</h3>
        <input className="form-control mb-2" placeholder="Name" required onChange={e => setName(e.target.value)} />
        <input className="form-control mb-2" type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-success w-100 mb-2" type="submit">Register</button>
        <p className="text-center">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
