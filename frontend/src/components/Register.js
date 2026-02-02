// import { useNavigate, Link } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/contacts");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>

//       <input placeholder="Name" required />
//       <input placeholder="Email" required />
//       <input type="password" placeholder="Password" required />

//       <button type="submit">Register</button>

//       <p>
//         Already have an account?{" "}
//         <Link to="/">Login here</Link>
//       </p>
//     </form>
//   );
// }

// export default Register;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // save user in localStorage
    localStorage.setItem("user", JSON.stringify({ name, email }));
    navigate("/contacts");
  };

  return (
    <div className="container mt-5">
      <form className="card p-4 mx-auto" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
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
