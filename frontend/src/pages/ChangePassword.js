import { useState } from "react";
import { changePassword } from "../auth/authService";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(form);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="Current Password"
        value={form.currentPassword}
        onChange={(e) =>
          setForm({ ...form, currentPassword: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="New Password"
        value={form.newPassword}
        onChange={(e) =>
          setForm({ ...form, newPassword: e.target.value })
        }
      />

      <button type="submit">Update Password</button>
    </form>
  );
};

export default ChangePassword;
