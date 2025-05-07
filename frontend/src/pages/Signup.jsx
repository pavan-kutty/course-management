import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css"

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', formData);
      alert('Signup successful! Please login.');
      navigate('/login'); // go to login page
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data?.message || 'Something went wrong'));
      console.log(err);
    }
  };

  return (
    <div className="signup-container">

    <form className='signup-form' onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="Student">Student</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Signup</button>
    </form>
    </div>
  );
}

export default Signup;




