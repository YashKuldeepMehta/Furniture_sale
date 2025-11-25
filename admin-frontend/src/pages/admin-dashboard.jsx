import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../styles/admin-dashboard.css";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem("admin-token");

    useEffect(() => {

        const fetchStats = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/admin/stats", { headers: { Authorization: token, 'Content-Type': 'application/json' } })
                if (res.status === 200) {
                    setStats(res.data)
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error) {
                    toast.error(err.response.data.error, {position: "top-center",autoClose: 1500,});
                }
            }
        }

        fetchStats();
        }, []);

    if (!stats) return <h2 className="loading">Loading Dashboard...</h2>;

    return (
        <div className="admin-layout">
            <Sidebar />

            <div className="admin-content">
                <h1>Dashboard</h1>

                <div className="stats-grid">
                    <div className="stat-card green"><h2>{stats.totalusers}</h2><p>Total Users</p></div>
                    <div className="stat-card blue"><h2>{stats.totalorders}</h2><p>Total Orders</p></div>
                    <div className="stat-card yellow"><h2>{stats.pending}</h2><p>Pending</p></div>
                    <div className="stat-card orange"><h2>{stats.confirmed}</h2><p>Confirmed</p></div>
                    <div className="stat-card purple"><h2>{stats.shipped}</h2><p>Shipped</p></div>
                    <div className="stat-card teal"><h2>{stats.delivered}</h2><p>Delivered</p></div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
