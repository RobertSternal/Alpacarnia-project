import React, { useState } from "react";
import "../App.css";
import "./SignUpForm.css";
import { Link } from "react-router-dom";

function SignUpForm() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.className]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/server/auth/signup", formData);
  };
  console.log(formData);
  return (
    <div className="signup-container">
      <h1 className="signup-title"> Zarejestruj się </h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="username"
          className="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="password"
          onChange={handleChange}
        />
        <button> Utwórz konto</button>
      </form>
      <div className="signin-link">
        <p>Masz konto?</p>
        <Link to={"/sign-in"}>
          <span className="signin-link-span">Zaloguj się</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;
