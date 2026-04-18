import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userEmail", formData.email);
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-6 p-5 text-center">
          <img
            src="media/images/signup.png"
            style={{ width: "90%" }}
            alt="Login"
          />
        </div>
        <div className="col-6 p-5">
          <form onSubmit={handleLogin} className="p-4 border rounded shadow-sm">
            <h1 className="mb-4">Login</h1>
            <p className="text-muted mb-4">Access your account to trade.</p>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 p-2 fs-5"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
