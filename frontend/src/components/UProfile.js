
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ChangePasswordModal from "./ChangePasword";

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
//         <div className="card-header bg-primary text-white">User Profile</div>
//         <div className="card-body">
//           <p><strong>Name:</strong> {user?.name || "N/A"}</p>
//           <p><strong>Email:</strong> {user?.email || "N/A"}</p>

//           <div className="d-flex flex-wrap gap-2 mt-3">
//             <button className="btn btn-warning" onClick={() => setShowPasswordModal(true)}>Change Password</button>
//             <button className="btn btn-danger" onClick={logout}>Logout</button>
//           </div>
//         </div>
//       </div>

//       {showPasswordModal && <ChangePasswordModal onCancel={() => setShowPasswordModal(false)} />}
//     </div>
//   );
// }

// export default UserProfile;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Reset Password
  const handleResetPassword = () => {
    if (!newPassword) {
      alert("Please enter new password");
      return;
    }

    // Simulate password update
    alert("✅ Password updated successfully");
    setNewPassword("");
    setShowPasswordModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">User Profile</h3>

        {/* User Details */}
        <div className="mb-3">
          <strong>Name:</strong> {user?.name}
        </div>

        <div className="mb-3">
          <strong>Email:</strong> {user?.email}
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-warning"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= CHANGE PASSWORD MODAL ================= */}
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

export default UserProfile;
