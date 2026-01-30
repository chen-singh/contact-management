// import React from 'react'

// export const Header = ({toogleModel,nbOfcontacts}) => {
//   return (
//    <header className='header'>
//    <div className='container'>
     
//      <h3>Contacts({nbOfcontacts})</h3>
//      <button onClick={()=>{toogleModel(true)}} className='btn'>
//         <i className='bi bi-plus-quare'></i>Add Contact
//         </button>
     
//    </div>

//    </header>
//   )
// }
// 
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav style={styles.nav}>
      <h3>Contact App</h3>
      <div>
        <Link to="/contacts" style={styles.link}>Contacts</Link>
        <Link to="/login" style={styles.link}>Logout</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#eee",
  },
  link: {
    marginLeft: "15px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
