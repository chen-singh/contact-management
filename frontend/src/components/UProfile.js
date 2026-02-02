// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ChangePasswordModal from "./ChangePasswordModal";

// function UserProfile() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [showPasswordModal, setShowPasswordModal] = useState(false);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="container mt-4">
//       <div className="card shadow">
//         <div className="card-header bg-primary text-white">
//           User Profile
//         </div>

//         <div className="card-body">
//           <p><strong>Name:</strong> {user?.name || "N/A"}</p>
//           <p><strong>Email:</strong> {user?.email || "N/A"}</p>

//           <div className="d-flex flex-wrap gap-2 mt-3">
//             <button
//               className="btn btn-warning"
//               onClick={() => setShowPasswordModal(true)}
//             >
//               Change Password
//             </button>

//             <button
//               className="btn btn-danger"
//               onClick={logout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {showPasswordModal && (
//         <ChangePasswordModal
//           onCancel={() => setShowPasswordModal(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default UserProfile;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePasword";

function UserProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">User Profile</div>
        <div className="card-body">
          <p><strong>Name:</strong> {user?.name || "N/A"}</p>
          <p><strong>Email:</strong> {user?.email || "N/A"}</p>

          <div className="d-flex flex-wrap gap-2 mt-3">
            <button className="btn btn-warning" onClick={() => setShowPasswordModal(true)}>Change Password</button>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>

      {showPasswordModal && <ChangePasswordModal onCancel={() => setShowPasswordModal(false)} />}
    </div>
  );
}

export default UserProfile;
