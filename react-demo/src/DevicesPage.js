import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './DevicesPage.css';

const DevicesPage = () => {
    const navigate = useNavigate(); // Create navigate object
    const [devices, setDevices] = useState([]);
    const [deviceDetails, setDeviceDetails] = useState({
        id: null,
        description: '',
        address: '',
        maxEnergyConsumption: '',
        personId: '',
    });

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await axios.get('http://app-device.localhost/devices/all');
            const data = response.data;
            if (Array.isArray(data)) {
                setDevices(data);
            } else {
                console.error('Expected an array of devices but got:', data);
                setDevices([]);
            }
        } catch (error) {
            console.error('Error fetching devices:', error);
            setDevices([]); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeviceDetails({ ...deviceDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (deviceDetails.id) {
                await axios.put(`http://app-device.localhost/devices/update/${deviceDetails.id}`, deviceDetails);
            } else {
                await axios.post('http://app-device.localhost/devices/add', deviceDetails);
            }
            fetchDevices(); 
            resetForm(); 
        } catch (error) {
            console.error('Error saving device:', error);
        }
    };

    const handleEdit = (device) => {
        setDeviceDetails(device);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://app-device.localhost/devices/delete/${id}`);
            fetchDevices(); 
        } catch (error) {
            console.error('Error deleting device:', error);
        }
    };

    const resetForm = () => {
        setDeviceDetails({
            id: null,
            description: '',
            address: '',
            maxEnergyConsumption: '',
            personId: '',
        });
    };

    return (
        <div className="devices-container">
            <h2>Devices Management</h2>
            <button onClick={() => navigate('/admin')}>Back to Admin Page</button> {/* Back Button */}
            <form onSubmit={handleSubmit}>
                <h3>{deviceDetails.id ? 'Edit Device' : 'Add New Device'}</h3>
                <input
                    type="text"
                    name="description"
                    placeholder="Device Name"
                    value={deviceDetails.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Device Type"
                    value={deviceDetails.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="maxEnergyConsumption"
                    placeholder="Max Energy Consumption"
                    value={deviceDetails.maxEnergyConsumption}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="personId"
                    placeholder="Person ID"
                    value={deviceDetails.personId}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{deviceDetails.id ? 'Update Device' : 'Add Device'}</button>
                {deviceDetails.id && <button type="button" onClick={resetForm}>Cancel Edit</button>}
            </form>

            <h3>Existing Devices</h3>
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
                    {(devices || []).map(device => (
                        <tr key={device.id}>
                            <td>{device.description}</td>
                            <td>{device.address}</td>
                            <td>{device.maxEnergyConsumption}</td>
                            <td>{device.personId}</td>
                            <td>
                                <button onClick={() => handleEdit(device)}>Edit</button>
                                <button onClick={() => handleDelete(device.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DevicesPage;
