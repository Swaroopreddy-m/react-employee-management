import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [ip, setIp] = useState("");
  const [others, setOthers] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !userId || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        name,
        userId,
        password,
        createdBy,
        approvedBy,
        ip,
        others
      });

      alert("Signup successful. Please login.");
      navigate("/");

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Signup failed");
      } else {
        setError("Network error. Check backend.");
      }
    }
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <h1>
          <span>E</span>mployee <span>M</span>anagement
        </h1>
        <p>Create your account</p>
      </header>

      <div className="signup-container">
        <div className="signup-card">
          <h2>Create Account</h2>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSignup} className="signup-form-grid">
            {/* Left Column */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Right Column */}
            <input
              type="text"
              placeholder="Created By"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
            />
            <input
              type="text"
              placeholder="Approved By"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
            />
            <input
              type="text"
              placeholder="IP Address"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
            <input
              type="text"
              placeholder="Others"
              value={others}
              onChange={(e) => setOthers(e.target.value)}
            />

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;