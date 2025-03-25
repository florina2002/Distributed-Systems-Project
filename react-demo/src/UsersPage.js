import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UsersPage.css';
import { HOST_PERSON } from "./Hosts";

function UsersPage() {
  const navigate = useNavigate(); // Create navigate object
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'CLIENT' });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${HOST_PERSON}/users/all`);
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  // Add or update user
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      // Update user
      await fetch(`${HOST_PERSON}/usersusers/update/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      setEditingUser(null); // Reset editing user
    } else {
      // Add new user
      await fetch(`${HOST_PERSON}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
    }
    setNewUser({ username: '', password: '', role: 'CLIENT' }); // Reset the form
    window.location.reload(); // Reload to fetch updated user list
  };

  // Delete user and associated devices
  const deleteUser = async (id) => {
    // First, delete the devices associated with this user
    await fetch(`http://app-device.localhost/devices/delete-by-personId/${id}`, {
      method: 'DELETE',
    });

    // Now, delete the user
    await fetch(`${HOST_PERSON}/users/delete/${id}`, {
      method: 'DELETE',
    });

    window.location.reload(); // Reload to fetch updated user list
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser(user); // Populate form with user details for editing
  };

  // Reset form to initial state
  const resetForm = () => {
    setNewUser({ username: '', password: '', role: 'CLIENT' });
    setEditingUser(null);
  };

  return (
    <div className="users-container">
      <h2>Users Management</h2>
      <button onClick={() => navigate('/admin')}>Back to Admin Page</button> {/* Back Button */}
      <form onSubmit={handleUserSubmit}>
        <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="CLIENT">Client</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
        {editingUser && <button type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>
  
      <h3>Existing Users</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <button className="actions-button" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="actions-button" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;