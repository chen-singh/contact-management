// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container">
//         <Link className="navbar-brand" to="/contacts">ContactApp</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto align-items-center">
//             <li className="nav-item">
//               <Link className="nav-link" to="/contacts">Contacts</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/profile">Profile</Link>
//             </li>
//             <li className="nav-item">
//               <button className="btn btn-danger btn-sm ms-2" onClick={logout}>Logout</button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
