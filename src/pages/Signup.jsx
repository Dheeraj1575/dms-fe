import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Normally, call API here: signup(username, password, role)

    // Simulate success
    alert(`User: ${username}\nRole: ${role}\nSignup successful!`);

    // Redirect based on role
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "VOLUNTEER") {
      navigate("/volunteer");
    } else {
      navigate("/customer");
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="CUSTOMER">Customer</option>
          <option value="VOLUNTEER">Volunteer</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
