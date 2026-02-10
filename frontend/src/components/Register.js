
// import { useState  } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api/apiaxious";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

 
//     const register = async (e) => {
//       e.preventDefault();
//     try {
//       await api.post("/auth/register", {name, email, password });
//       alert("✅ Registration successful. You can login now.");
//       navigate("/login")
//     } catch (err) {
//       alert(err.response?.data || "Registration failed");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <form className="card p-4 mx-auto" style={{ maxWidth: "400px" }} onSubmit={register}>
//         <h3 className="text-center mb-3">Register</h3>
//         <input className="form-control mb-2" placeholder="Name" required onChange={e => setName(e.target.value)} />
//         <input className="form-control mb-2" type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
//         <input className="form-control mb-2" type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
//         <button className="btn btn-success w-100 mb-2" type="submit">Register</button>
//         <p className="text-center">
//           Already have an account? <Link to="/">Login here</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Register;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/apiaxious";
import "./Login.css"; // Shared theme

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("✅ Registration successful. You can login now.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={register}>
        <h2>Create Account</h2>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="floatingName">Name</label>
        </div>

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

        <button className="btn btn-success btn-lg w-100 mb-3" type="submit">Register</button>

        <p className="text-center mb-0">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
