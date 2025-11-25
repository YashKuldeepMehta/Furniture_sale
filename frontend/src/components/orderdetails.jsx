import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "../styles/orderdetails.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from 'react-toastify'


const Orders = () => {
    const {id} = useParams()
    const [order,setOrdersDetails] = useState(null)
    const token = localStorage.getItem("token")

    useEffect(()=>{

        const fetchOrdersDetails = async()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/orderdetails/${id}`,{headers:{Authorization:token, 'Content-Type': 'application/json' }})

                if(res.status === 200){
                    setOrdersDetails(Array.isArray(res.data) ? res.data[0] : res.data)
                    console.log(res.data)
                }
            }catch(err){
                if(err.response && err.response.data && err.response.data.error){
                    toast.error(err.response.data.error,{position:"top-center",autoClose:1500})
                    return
                }
            }
        }
        fetchOrdersDetails();
    },[id])

   if (order === null) {
    return <p className="loading-text">Loading order details...</p>;
  }

  const { address, cartItems } = order;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Navbar />

      <div className="orderdetails-container">
        <h1>Order Details</h1>

        <div className="order-card">
          <div className="order-header">
            <div>
              <h3>Order #{order._id.slice(-6)}</h3>
              <p className="order-date">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span className={`order-status ${order.orderStatus}`}>
              {order.orderStatus.toUpperCase()}
            </span>
          </div>

          <div className="order-timeline">
            <div className={`timeline-step ${["pending","confirmed","shipped","delivered"].includes(order.orderStatus) ? "active" : ""}`}>Pending</div>
            <div className={`timeline-step ${["confirmed","shipped","delivered"].includes(order.orderStatus) ? "active" : ""}`}>Confirmed</div>
            <div className={`timeline-step ${["shipped","delivered"].includes(order.orderStatus) ? "active" : ""}`}>Shipped</div>
            <div className={`timeline-step ${order.orderStatus === "delivered" ? "active" : ""}`}>Delivered</div>
          </div>

          <div className="details-section">
            <h2>Shipping Address</h2>
            <p>{order.name}</p>
            <p>{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            <p>{address.city}, {address.state} - {address.pincode}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Email:</strong> {order.email}</p>
          </div>

          <div className="details-section">
            <h2>Payment Information</h2>
            <p><strong>Method:</strong> {order.paymentMethod.toUpperCase()}</p>

            {order.paymentMethod === "card" && (
              <>
                <p><strong>Name on Card:</strong> {order.paymentDetails.cardName}</p>
                <p><strong>Card:</strong> **** **** **** {order.paymentDetails.cardNumber.slice(-4)}</p>
              </>
            )}

            {order.paymentMethod === "upi" && (
              <p><strong>UPI ID:</strong> {order.paymentDetails.upiId}</p>
            )}
          </div>

          <div className="details-section">
            <h2>Items in this Order</h2>

            {cartItems.map((item) => (
              <div className="order-item" key={item.productId}>
                <img src={`/images/${item.image}`} alt={item.name} />

                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>

                <p className="item-price">₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="details-section total-section">
            <h2>Total Summary</h2>
            <p><strong>Total Amount:</strong> ₹{order.totalamount}</p>
          </div>
        </div>
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
                            <li><Link to="/category/sofa">Shop</Link></li>
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

export default Orders;
