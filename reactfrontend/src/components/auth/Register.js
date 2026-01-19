import { useState } from "react";
import AuthCard from "./AuthCard";

export default function Register() {
  const [method, setMethod] = useState("email");

  return (
    <AuthCard title="Create Account" subtitle="Register using email or phone">
      <form>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input className="form-control" placeholder="John Doe" />
        </div>

        <div className="mb-3">
          <label className="form-label">Register With</label>
          <select
            className="form-select"
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        {method === "email" ? (
          <input className="form-control mb-3" placeholder="Email Address" />
        ) : (
          <input className="form-control mb-3" placeholder="Phone Number" />
        )}

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
        />

        <input
          type="password"
          className="form-control mb-4"
          placeholder="Confirm Password"
        />

        <button className="btn btn-primary w-100">Register</button>
      </form>
    </AuthCard>
  );
}
