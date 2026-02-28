

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function UserProfile() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [newPassword, setNewPassword] = useState("");

  
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

 
//   const handleResetPassword = () => {
//     if (!newPassword) {
//       alert("Please enter new password");
//       return;
//     }

//     alert("✅ Password updated successfully");
//     setNewPassword("");
//     setShowPasswordModal(false);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
//         <h3 className="text-center mb-4">User Profile</h3>

      
//         <div className="mb-3">
//           <strong>Name:</strong> {user?.name}
//         </div>

//         <div className="mb-3">
//           <strong>Email:</strong> {user?.email}
//         </div>

//         <div className="d-flex justify-content-between mt-4">
//           <button
//             className="btn btn-warning"
//             onClick={() => setShowPasswordModal(true)}
//           >
//             Change Password
//           </button>

//           <button
//             className="btn btn-danger"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

     
//       {showPasswordModal && (
//         <div className="modal d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5>Change Password</h5>
//                 <button
//                   className="btn-close"
//                   onClick={() => setShowPasswordModal(false)}
//                 ></button>
//               </div>

//               <div className="modal-body">
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Enter new password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                 />
//               </div>

//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setShowPasswordModal(false)}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   className="btn btn-primary"
//                   onClick={handleResetPassword}
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserProfile;


// import React, { useEffect, useState } from "react";
// import api from "../api/apiaxious";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await api.get("/api/auth/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setProfile(response.data);
//     } catch (error) {
//       console.error("Profile fetch error:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await api.put(
//         "/users/profile",
//         profile,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setProfile(response.data);
//       alert("Profile updated successfully");
//     } catch (error) {
//       console.error("Profile update error:", error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>My Profile</h2>

//       <input
//         className="form-control mb-2"
//         name="Name"
//         value={profile.name}
//         onChange={handleChange}
//         placeholder="Name"
//       />

//       <input
//         className="form-control mb-2"
//         name="email"
//         value={profile.email}
//         onChange={handleChange}
//         placeholder="Email"
//       />

//       <button className="btn btn-primary" onClick={handleUpdate}>
//         Update Profile
//       </button>

//       <button
//         className="btn btn-secondary ms-2"
//         onClick={() => navigate("/contacts")}
//       >
//         Back
//       </button>
//     </div>
//   );
// };

// export default Profile;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiaxious";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // ✅ Fetch profile from backend
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {

      const token = localStorage.getItem("token");
      const response = await api.get("/auth/profile",{  headers: {
           Authorization: `Bearer ${token}`,
         },});
      setUser(response.data);
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  // ✅ Logout (remove token)
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Change Password API Call
  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("Please enter new password");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.put("/auth/change-password", {  headers: {
           Authorization: `Bearer ${token}`,
         },},{
        newPassword: newPassword,
      });

      alert("✅ Password updated successfully");
      setNewPassword("");
      setShowPasswordModal(false);
    } catch (error) {
      console.error("Password update error:", error);
      alert("❌ Failed to update password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">User Profile</h3>

        <div className="mb-3">
          <strong>Name:</strong> {user.name} 
        </div>

        <div className="mb-3">
          <strong>Email:</strong> {user.email}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-warning"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Change Password</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowPasswordModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleResetPassword}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;