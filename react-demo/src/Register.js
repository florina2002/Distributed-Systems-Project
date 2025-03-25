import React, { useState } from 'react';
import './Register.css'; // Import the new CSS
import { HOST_PERSON } from "./Hosts";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('1'); // Default role
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${HOST_PERSON}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    });

    if (response.ok) {
      setMessage('Registration successful!');
    } else {
      setMessage('Registration failed! Try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          {message && <p className="message">{message}</p>}
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
