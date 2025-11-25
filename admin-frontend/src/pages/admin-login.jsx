import React, { useState } from "react";
import axios from "axios";
import "../styles/admin-login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useAuth} from "./authcontext"

const AdminLogin = () => {
    const navigate = useNavigate();
    const {login} = useAuth()

    const [admin, setAdmin] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!admin.email || !admin.password) {
            toast.error("Please fill in all fields", { position: "top-center", autoClose: 1500 });
            return;
        }
        try {
            const res = await axios.post("http://localhost:5000/api/admin/login", admin);
            if (res.status === 200) {
                login(res.data.admintoken);
                navigate("/admin-dashboard");
            }

        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error, {
                    position: "top-center",
                    autoClose: 1500,
                });
            } else {
                toast.error("Login failed", {
                    position: "top-center",
                    autoClose: 1500,
                });
            }
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h2>Admin Login</h2>

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter admin email"
                        value={admin.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter admin password"
                        value={admin.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
