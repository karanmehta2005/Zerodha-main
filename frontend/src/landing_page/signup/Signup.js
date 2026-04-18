import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/signup", {
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
        alert(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof TypeError && error.message.includes("fetch")) {
        alert("Unable to connect to the server. Please ensure the backend is running.");
      } else {
        alert("An error occurred during signup.");
      }
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-6 p-5 text-center">
          <img
            src="media/images/signup.png"
            style={{ width: "90%" }}
            alt="Signup"
          />
        </div>
        <div className="col-6 p-5">
          <form onSubmit={handleSignup} className="p-4 border rounded shadow-sm">
            <h1 className="mb-4">Signup now</h1>
            <p className="text-muted mb-4">Create your account to start trading.</p>

            <div className="mb-3">
              <label className="form-label">User ID (Username)</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Choose a username"
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Create a password"
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

export default Signup;
