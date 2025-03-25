import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './ClientPage.css'; // Import CSS for styling
import { HOST_PERSON } from "./Hosts";

const ClientPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [devices, setDevices] = useState([]);
    const [editingDevice, setEditingDevice] = useState(null);
    const [deviceDetails, setDeviceDetails] = useState({
        description: '',
        address: '',
        maxEnergyConsumption: 0,
        personId: '',
    });
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        role: '',
    });
    const userId = localStorage.getItem('userId'); // userId is stored in local storage

    const fetchUserInfo = useCallback(async () => {
        try {
            const response = await axios.get(`${HOST_PERSON}/users/${userId}`);
            setUserInfo(response.data);
            setUserDetails({
                username: response.data.username,
                password: response.data.password,
                role: response.data.role,
            });
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    }, [userId]);

    const fetchUserDevices = useCallback(async () => {
        try {
            const response = await axios.get(`http://app-device.localhost/devices/person/${userId}`);
            setDevices(response.data);
            console.log("Devices fetched:", response.data); // Check if devices are being updated
        } catch (error) {
            console.error('Error fetching user devices:', error);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchUserInfo();
            fetchUserDevices();
        }
    }, [userId, fetchUserInfo, fetchUserDevices]);

    const handleAddDevice = async (e) => {
        e.preventDefault();
        const newDevice = { ...deviceDetails, personId: userId };

        try {
            const response = await axios.post(`http://app-device.localhost/devices/add`, newDevice);
            if (response.status === 200) {
                console.log('Device added successfully:', response.data);
                // Clear the form inputs
                setDeviceDetails({ description: '', address: '', maxEnergyConsumption: 0, personId: '' });
                // Update the devices state with the newly added device
                setDevices([...devices, response.data]);

            } else {
                console.error('Failed to add device:', response);
            }
        } catch (error) {
            console.error('Error adding device:', error);
        }
    };

    const handleEditClick = (device) => {
        setEditingDevice(device);
        setDeviceDetails({
            description: device.description,
            address: device.address,
            maxEnergyConsumption: device.maxEnergyConsumption,
            personId: userId, // Using userId instead of personId
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://app-device.localhost/devices/update/${editingDevice.id}`, deviceDetails);
            if (response.status === 200) {
                // Update the specific device in the devices array
                setDevices(prevDevices =>
                    prevDevices.map(device =>
                        device.id === editingDevice.id ? { ...device, ...deviceDetails } : device
                    )
                );
                setEditingDevice(null);
                setDeviceDetails({ description: '', address: '', maxEnergyConsumption: 0, personId: '' });
            }
        } catch (error) {
            console.error('Error updating device:', error);
        }
    };

    const handleDelete = async (deviceId) => {
        try {
            const response = await axios.delete(`http://app-device.localhost/devices/delete/${deviceId}`);
            if (response.status === 200) {
                setDevices(devices.filter((device) => device.id !== deviceId));
            }
        } catch (error) {
            console.error('Error deleting device:', error);
        }
    };

    const handleUserEdit = () => {
        setIsEditingUser(true);
    };

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`h${HOST_PERSON}/users/update/${userId}`, userDetails);
            if (response.status === 200) {
                setUserInfo({ ...userInfo, ...userDetails });
                setIsEditingUser(false);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="client-container">
            <h2>User Information</h2>
            {isEditingUser ? (
                <form onSubmit={handleUserUpdate} className="user-info-form">
                    <input
                        type="text"
                        value={userDetails.username}
                        onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="text"
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Update User</button>
                    <button type="button" onClick={() => setIsEditingUser(false)}>Cancel</button>
                </form>
            ) : (
                <div className="user-info">
                    <p><strong>Username:</strong> {userInfo ? userInfo.username : 'Loading...'}</p>
                    <p><strong>Password:</strong> {userInfo ? userInfo.password : 'Loading...'}</p>
                    <p><strong>Role:</strong> {userInfo ? userInfo.role : 'Loading...'}</p>
                    <button onClick={handleUserEdit}>Edit User Information</button>
                </div>
            )}

            <h3>Add New Device</h3>
            <form onSubmit={handleAddDevice} className="device-form">
                <input
                    type="text"
                    value={deviceDetails.description}
                    onChange={(e) => setDeviceDetails({ ...deviceDetails, description: e.target.value })}
                    placeholder="Device Name"
                    required
                />
                <input
                    type="text"
                    value={deviceDetails.address}
                    onChange={(e) => setDeviceDetails({ ...deviceDetails, address: e.target.value })}
                    placeholder="Device Type"
                    required
                />
                <input
                    type="number"
                    value={deviceDetails.maxEnergyConsumption}
                    onChange={(e) => setDeviceDetails({ ...deviceDetails, maxEnergyConsumption: parseFloat(e.target.value) })}
                    placeholder="Max Energy Consumption"
                    required
                />
                <button type="submit">Add Device</button>
            </form>

            <h3>User Devices</h3>
            {devices.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Device Name</th>
                            <th>Device Type</th>
                            <th>Max Energy Consumption</th>
                            <th>Person ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map(device => (
                            <tr key={device.id}>
                                <td>{device.description}</td>
                                <td>{device.address}</td>
                                <td>{device.maxEnergyConsumption}</td>
                                <td>{userId}</td>
                                <td>
                                    <button onClick={() => handleEditClick(device)}>Edit</button>
                                    <button onClick={() => handleDelete(device.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No devices found for this user.</p>
            )}

            {editingDevice && (
                <div className="edit-form">
                    <h3>Edit Device</h3>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            value={deviceDetails.description}
                            onChange={(e) => setDeviceDetails({ ...deviceDetails, description: e.target.value })}
                            placeholder="Device Name"
                            required
                        />
                        <input
                            type="text"
                            value={deviceDetails.address}
                            onChange={(e) => setDeviceDetails({ ...deviceDetails, address: e.target.value })}
                            placeholder="Device Type"
                            required
                        />
                        <input
                            type="number"
                            value={deviceDetails.maxEnergyConsumption}
                            onChange={(e) => setDeviceDetails({ ...deviceDetails, maxEnergyConsumption: parseFloat(e.target.value) })}
                            placeholder="Max Energy Consumption"
                            required
                        />
                        <input
                            type="text"
                            value={deviceDetails.personId}
                            readOnly
                        />
                        <button type="submit">Update Device</button>
                        <button type="button" onClick={() => setEditingDevice(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ClientPage;
