import AuthCard from "./AuthCard";

export default function ChangePassword() {
  return (
    <AuthCard title="Change Password" subtitle="Update your password securely">
      <form>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Current Password"
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
        />

        <input
          type="password"
          className="form-control mb-4"
          placeholder="Confirm New Password"
        />

        <button className="btn btn-warning w-100">Update Password</button>
      </form>
    </AuthCard>
  );
}
