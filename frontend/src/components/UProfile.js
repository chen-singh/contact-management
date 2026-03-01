

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiaxious"; 
import Modal from "./Modal"; 

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

 
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  
  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("Please enter new password");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.put(
        "/auth/change-password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Password updated successfully");
      setNewPassword("");
      setShowPasswordModal(false);
    } catch (error) {
      console.error("Password update error:", error);
      alert("❌ Failed to update password");
    }
  };

  return (
    <>
      
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
      </div>

      
      <Modal
        show={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleResetPassword}>
              Reset
            </button>
          </>
        }
      >
        <input
          type="password"
          className="form-control"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Modal>
    </>
  );
}

export default Profile;