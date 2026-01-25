// import React, { useState } from "react";
// import axios from "axios";

// function Login() {
    
//     const [password, setPasswordValue] = useState("");
//     const [userId, setUserIdValue] = useState("");

//     const setPassword = (e) => {
//         setPasswordValue(e.target.value);
//     };

//     const setUserId = (e) => {
//         setUserIdValue(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission

//         console.log("this is our data " + userId + "   " + password);

//         const data = {
//             userId: userId,
//             password: password
//         };

//         try {
//             const response = await axios.post("http://localhost:8082/loginUser", data);
//             console.log("this is the response " + response.data);

//             if (!response.data) {
//                 alert("Invalid User Id or Password");
//             } else {
//                 alert("Login Successful");
//             }

//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const redirectToRegister = () => {
//         window.location.href = "/register";
//     };

//     return (
//         <>
//             <h1> This is login page </h1>
//             <div className="container">
//                 <form onSubmit={handleSubmit}>

//                     <label>User ID:</label>
//                     <input type="email" placeholder="Enter your user id" 
//                            value={userId} onChange={setUserId} />
//                     <br /><br />

//                     <label>Password:</label>
//                     <input type="password" placeholder="Enter your password" 
//                            value={password} onChange={setPassword} />
//                     <br /><br />

//                     <a onClick={redirectToRegister}>Don't have an account?</a>
//                     <button type="submit">Login</button>
                    
//                 </form>
//             </div>
//         </>
//     );
// }

// export default Login;
