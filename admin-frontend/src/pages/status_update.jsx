import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../pages/Sidebar";
import "../styles/status_update.css";
import { toast } from "react-toastify";

const AdminStatusUpdate = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null)
    const token = localStorage.getItem("admin-token");

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/orders", {
                headers: { Authorization: token }
            });

            setOrders(res.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error, { position: "top-center", autoClose: 1500, });
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
            toast.error("Please select a status",{position:"top-center", autoClose:2000});
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/admin/order/${orderId}`,
                { status },
                { headers: { Authorization: token } }
            );

            toast.success("Status updated successfully", { position: "top-center", autoClose: 1500 });
            fetchOrders();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error, { position: "top-center", autoClose: 1500, });
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
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Current Status</th>
                            <th>Change Status</th>
                            <th>Update</th>
                            <th>View</th>
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

                                <td>
                                    <button
                                        className="view-btn"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {selectedOrder && (
                <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
                    <div
                        className="modal-box"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1>Order Details</h1>

                        <section>
                            <h2>Customer Info</h2>
                            <p><b>Name:</b> {selectedOrder.name}</p>
                            <p><b>Email:</b> {selectedOrder.email}</p>
                            <p><b>Phone:</b> {selectedOrder.phone}</p>
                        </section>

                        <section>
                            <h2>Address:</h2>
                            <p>
                                {selectedOrder.address.line1}, {selectedOrder.address.line2},
                                {selectedOrder.address.city}, {selectedOrder.address.state} -
                                {selectedOrder.address.pincode}
                            </p>
                        </section>

                        <section>
                            <h2>Payment:</h2>
                            <p>{selectedOrder.paymentMethod.toUpperCase()}</p>
                        </section>

                        <section>
                            <h2>Items</h2>
                            <table className="items-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.cartItems.map((item) => (
                                        <tr key={item._id}>
                                            <td className="item-cell">
                                                <img
                                                    src={`/images/${item.image}`}
                                                    alt={item.name}
                                                />
                                                {item.name}
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>₹{item.price}</td>
                                            <td>₹{item.quantity * item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>

                        <h3 className="total">
                            Grand Total: ₹{selectedOrder.totalamount}
                        </h3>

                        <button
                            className="close-btn"
                            onClick={() => setSelectedOrder(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default AdminStatusUpdate;
