import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../styles/user-status_update.css";
import { toast } from "react-toastify";

const UserStatusUpdate = () => {
  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const token = localStorage.getItem("admin-token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: token }
      });
      setUsers(res.data);
    } catch(err) {
        if(err?.response && err?.response?.data && err?.response?.data?.error){
            toast.error(err?.response?.data?.error, {position:"top-center", autoClose:2000})
        }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = (id, status) => {
    setSelectedStatus({ ...selectedStatus, [id]: status });
  };

  const updateStatus = async (id) => {
    if (!selectedStatus[id]) {
      toast.error("Please select a status", {position:"top-center", autoClose:2000});
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/userstatus/${id}`,
        { status: selectedStatus[id] },
        { headers: { Authorization: token } }
      );

      toast.success(res.data.message, {position:"top-center", autoClose:2000});
      fetchUsers();

    } catch(err) {
      toast.error(err?.response?.data?.error || "Error Updating User Status", {position:"top-center", autoClose:2000});
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content">
        <h1>User Management</h1>

        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Change</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  <span className={`badge ${user.status}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>

                <td>
                  <select
                    className="status-dropdown"
                    onChange={(e) =>
                      handleStatusChange(user._id, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="active">Activate</option>
                    <option value="inactive">Deactivate</option>
                  </select>
                </td>

                <td>
                  <button
                    className="update-btn"
                    onClick={() => updateStatus(user._id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default UserStatusUpdate;
