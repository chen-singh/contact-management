import { useState } from "react";

function ChangePasswordModal({ onCancel }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const resetPassword = () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    // Fake reset (no backend)
    alert("Password reset successfully");
    onCancel();
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
          <div className="modal-header">
            <h5 className="modal-title">Change Password</h5>
          </div>

          <div className="modal-body">
            <input
              type="password"
              className="form-control mb-2"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={resetPassword}>
              Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
