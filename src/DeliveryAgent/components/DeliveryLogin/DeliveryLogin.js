import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DeliveryLogin.css"; // External CSS

function DeliveryLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/delivery_boy_login",
        {
          phone,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem("DeliveryJwtToke", res.data.token);

        localStorage.setItem("delivery_boy_id", res.data.delivery_boy_id);

        navigate("/dashboard");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="delivery-login-container">
      <h2 className="login-heading">🚚 Delivery Agent Login</h2>
      <input
        className="login-input"
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
}

export default DeliveryLogin;
