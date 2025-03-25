import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { HOST_PERSON } from "./Hosts"; // Adjust the path as needed



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${HOST_PERSON}/users/login`, { // Corrected template literal usage
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      console.log('Login successful', user);
      setMessage('Login successful');

      // Store userId in local storage
      localStorage.setItem('userId', user.id); // Assuming the user object contains an id property

      // Check user's role
      try {
        const roleResponse = await fetch(`${HOST_PERSON}/users/role/${username}`); // Corrected template literal usage
        if (roleResponse.ok) {
          const userRole = await roleResponse.text();
          if (userRole === 'ADMIN') {
            navigate('/admin'); // Redirect to admin page
          } else if (userRole === 'CLIENT') {
            navigate('/client'); // Redirect to client page
          }
        } else {
          setMessage('Failed to retrieve user role');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setMessage('An error occurred while checking user role');
      }
    } else {
      setMessage('Login failed! Please check your username or password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
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
        {message && <p className="message">{message}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
