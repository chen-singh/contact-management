// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="container mt-4">
//       <h3>User Profile</h3>
//       <button className="btn btn-secondary" onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ProfilePage;
// //


import React, { useState } from "react";
import Navbar from "../components/Header";
import { changePassword } from "../service/authService";

const Profile = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChangePassword = async () => {
    await changePassword(form);
    alert("Password changed successfully");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Change Password</h3>
        <input type="password"
          className="form-control mb-2"
          placeholder="Old Password"
          onChange={(e) =>
            setForm({ ...form, oldPassword: e.target.value })
          } />
        <input type="password"
          className="form-control mb-2"
          placeholder="New Password"
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          } />
        <button className="btn btn-primary"
          onClick={handleChangePassword}>
          Change Password
        </button>
      </div>
    </>
  );
};

export default Profile;
