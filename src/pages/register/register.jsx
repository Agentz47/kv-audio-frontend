import { useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log({ firstName, lastName, email, password, address, phone });
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
        email: email,
        firstName : firstName,
        lastName : lastName,
        password: password,
        address: address,
        phone: phone
    }).then(() => {
      toast.success("Registration successful!");
      navigate("/login");
    }).catch((err) => {
      toast.error(err?.response?.data?.error || "An error occurred");
    })
  };

  return (
    <div className="bg-picture w-full h-screen flex justify-center items-center">
      <form onSubmit={handleOnSubmit}>
        <div className="register-container">
          <img src="/logo.png" alt="logo" className="logo" />

          <input
            type="text"
            placeholder="First Name"
            className="input-field"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            className="input-field"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone"
            className="input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="submit-button">Register</button>
        </div>
      </form>
    </div>
  );
}
