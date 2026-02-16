
// import React, { useState } from "react";
// import axios from "axios";

// function Register () {

//     const [register, setRegister] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//       setRegister({
//         ...register,
//         [e.target.name]: e.target.value
//       });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(register);

//         try {
//             const response = await axios.post('http://localhost:8082/addUser', register);
//             console.log(response.data);
//             alert("User added successfully");
//        } catch (error) {
//             console.log(error);
//        }
//     };
    
//     return (
//        <div className="container">
//           <form onSubmit={handleSubmit}>
//             <h2>Register</h2>

//             <label>Name:</label>
//             <input type="text" name="name" placeholder="Enter your name" value={register.name} onChange={handleChange} />
            

//             <label>Email:</label>
//             <input type="email" name="email" placeholder="Enter your email" value={register.email} onChange={handleChange} />
            

//             <label>Password:</label>
//             <input type="password" name="password" placeholder="Enter your password" value={register.password} onChange={handleChange} />
            

//             <button type="submit">Register</button>
//           </form>
//        </div>
//     );
// }

// export default Register;

import React, { useState } from "react";
import { registerUser } from "../service/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="First Name"
          onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <input className="form-control mb-2" placeholder="Last Name"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <input className="form-control mb-2" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default Register;
