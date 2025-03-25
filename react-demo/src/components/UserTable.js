import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { HOST_PERSON } from "../Hosts";
import { toast } from "react-toastify";

const UserTable = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let isRendered = true;

    axios
      .get(`${HOST_PERSON}/users/all`)
      .then((response) => {
        if (isRendered) {
          console.log("API Response:", response.data); // Debugging line
          setUserData(response.data || []); // Ensure it's always an array
          toast.success("User data fetched successfully!");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message); // Logs the main error message
        console.error("Full Error:", error); // Logs the entire error object
        toast.error("Error fetching user data");
      });
      
    return () => {
      isRendered = false;
    };
  }, []);

  return (
    <div>
      <h1>User Table</h1>
      <Table variant="dark" striped bordered hover className="small-table">
        <thead>
          <tr>
            <th>#id</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(userData) &&
            userData.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
