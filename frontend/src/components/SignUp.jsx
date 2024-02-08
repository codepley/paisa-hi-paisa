/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        data: {...user}
      })
      const token = response.data.token;
      // console.log(response.data.token)
      localStorage.setItem('token', token)
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center gap-2">
      <h2>Sign Up</h2>
      <input
        value={user.email}
        name="email"
        onChange={handleChange}
        className="border-black p-2 border-2"
        type="text"
        placeholder="email"
      />
      <input
        value={user.firstName}
        name="firstName"
        onChange={handleChange}
        className="border-black p-2 border-2"
        type="text"
        placeholder="firstName"
      />
      <input
        value={user.lastName}
        name="lastName"
        onChange={handleChange}
        className="border-black p-2 border-2"
        type="text"
        placeholder="lastName"
      />
      <input
        value={user.password}
        name="password"
        onChange={handleChange}
        className="border-black p-2 border-2"
        type="password"
        placeholder="password"
      />
      <button
        onClick={handleSignup}
        className="bg-black text-white p-3"
        type="submit"
      >
        Sign Up
      </button>
    </div>
  );
};
export default SignUp;
