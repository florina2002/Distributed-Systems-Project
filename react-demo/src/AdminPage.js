import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css' // Ensure the CSS file is linked correctly

function AdminPage() {
    return (
        <div className="admin-container">
            <h2 className="admin-header">Admin Dashboard</h2>
            <div className="admin-buttons">
                <Link to="/users">
                    <button className="admin-button">Manage Users</button>
                </Link>
                <Link to="/devices">
                    <button className="admin-button">Manage Devices</button>
                </Link>
            </div>
        </div>
    );
}

export default AdminPage;
