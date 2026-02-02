// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/contacts");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>

//       <input placeholder="Email" required />
//       <input type="password" placeholder="Password" required />

//       <button type="submit">Login</button>

//       <p>
//         Don’t have an account?{" "}
//         <Link to="/register">Register here</Link>
//       </p>
//     </form>
//   );
// }

// export default Login;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // save user in localStorage (mock login)
    localStorage.setItem("user", JSON.stringify({ name: "John Doe", email }));
    navigate("/contacts");
  };

  return (
    <div className="container mt-5">
      <form className="card p-4 mx-auto" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
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
