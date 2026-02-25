 
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api/apiaxious";
// import "./Login.css"; 

// function Register() {
//   const [name, setName] = useState("");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
 
//   // const register = (e) => {
//   //   e.preventDefault();

//   //   if (name && email && password) {
//   //     navigate("/contact");
//   //   } else {
//   //     alert("Please fill all fields");
//   //   }
//   // };

//   const register = async (e) => {
//   e.preventDefault();

//   if (!name || !email || !password) {
//     alert("Please fill all fields");
//     return;
//   }

//   try {
//     const { data } = await api.post("/auth/register", {name, email, password });
  
//     if(data&& data.email){
//     alert("User registered successfully");
//       navigate("/contact");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Registration failed. Try again.");
//   }
// };
//   return (
//     <div className="auth-wrapper">
//       <form className="auth-card" onSubmit={register}>
//         <h2>Create Account</h2>

//         <div className="form-floating mb-3">
//           <input
//             type="text"
//             className="form-control"
//             id="floatingName"
//             placeholder="Name"
//             required
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <label htmlFor="floatingName">Name</label>
//         </div>
       

//         <div className="form-floating mb-3">
//           <input
//             type="email"
//             className="form-control"
//             id="floatingEmail"
//             placeholder="Email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label htmlFor="floatingEmail">Email</label>
//         </div>

//         <div className="form-floating mb-3">
//           <input
//             type="password"
//             className="form-control"
//             id="floatingPassword"
//             placeholder="Password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <label htmlFor="floatingPassword">Password</label>
//         </div>

//         <button className="btn btn-success btn-lg w-100 mb-3" type="submit">Register</button>

//         <p className="text-center mb-0">
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
import "./Login.css"; 

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password
      });

      if (data && data.email) {
        alert("User registered successfully");
        navigate("/contact");
      } else {
        alert("Registration succeeded but response is unexpected");
        console.log("Response data:", data);
      }
    } catch (error) {
      console.error("Registration error:", error.response || error);
      alert(error.response?.data?.message || "Registration failed. Try again.");
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
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <button className="btn btn-success btn-lg w-100 mb-3" type="submit">
          Register
        </button>

        <p className="text-center mb-0">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;