import React, { useEffect, useState } from "react";
import "../styles/orderslist.css";
import Navbar from "./navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const OrdersList = () => {
   const [orders,setOrders] = useState([])
    const token = localStorage.getItem("token")

    useEffect(()=>{

        const fetchOrders = async()=>{
            try{
                const res = await axios.get("http://localhost:5000/api/fetchorders",{headers:{Authorization:token, 'Content-Type': 'application/json' }})

                if(res.status === 200){
                    setOrders(res.data)
                    console.log(res.data)
                }
            }catch(err){
                if(err.response && err.response.data && err.response.data.error){
                    toast.error(err.response.data.error,{position:"top-center",autoClose:1500})
                }
            }
        }
        fetchOrders();
    },[])

    const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "status-pending";
      case "confirmed": return "status-confirmed";
      case "shipped": return "status-shipped";
      case "delivered": return "status-delivered";
      default: return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Navbar />

      <div className="orderslist-container">
        <h1>Your Orders</h1>

        {orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <div className="orderslist-main">
            {orders.map((order) => (
              <div className="orderslist-card" key={order._id}>

                <div className="orderslist-left">
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="order-total">Total: ₹{order.totalamount}</p>
                </div>

                <div className="orderslist-right">
                  <span className={`order-status-badge ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus.toUpperCase()}
                  </span>

                  <Link to={`/orders/${order._id}`}>
                    <button className="view-details-btn">View Details</button>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

       <footer className="site-footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>MyFurlenco</h3>
                        <p>Affordable luxury furniture delivered to your doorstep.</p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/category/sofas">Shop</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p>Email: support@myfurlenco.com</p>
                        <p>Phone: +91 93217 88548</p>
                        <p>Location: Mumbai, India</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} MyFurlenco. All rights reserved.</p>
                </div>
            </footer>
    </motion.div>
  );
};

export default OrdersList;
