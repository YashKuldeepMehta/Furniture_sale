import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../pages/Sidebar";
import "../styles/status_update.css";
import { toast } from "react-toastify";

const AdminStatusUpdate = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const token = localStorage.getItem("admin-token");

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/orders", {
                headers: { Authorization: token }
            });

            setOrders(res.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error, {position: "top-center",autoClose: 1500,});
            }
        };
    }

        useEffect(() => {
            fetchOrders();
        }, []);


        const handleStatusChange = (orderId, status) => {
            setSelectedStatus({ ...selectedStatus, [orderId]: status });
        };

        const updateOrderStatus = async (orderId) => {
            const status = selectedStatus[orderId];
            if (!status) {
                toast.error("Please select a status");
                return;
            }

            try {
                await axios.put(
                    `http://localhost:5000/api/admin/order/${orderId}`,
                    { status },
                    { headers: { Authorization: token } }
                );

                toast.success("Status updated successfully",{position:"top-center", autoClose:1500});
                fetchOrders();
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error, {position: "top-center",autoClose: 1500,});
            }
            }
        };

        return (
            <div className="admin-layout">
                <Sidebar />

                <div className="admin-content">
                    <h1>Status Update</h1>

                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Total</th>
                                <th>Current Status</th>
                                <th>Change Status</th>
                                <th>Update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>#{order._id.slice(-6)}</td>
                                    <td>{order.name}</td>
                                    <td>₹{order.totalamount}</td>

                                    <td>
                                        <span className={`badge ${order.orderStatus}`}>
                                            {order.orderStatus.toUpperCase()}
                                        </span>
                                    </td>

                                    <td>
                                        <select
                                            className="status-dropdown"
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </td>

                                    <td>
                                        <button
                                            className="update-btn"
                                            onClick={() => updateOrderStatus(order._id)}
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


    export default AdminStatusUpdate;
