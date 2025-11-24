import React, { useState } from "react";
import Navbar from "./navbar";
import "../styles/contact.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {motion} from 'framer-motion'

const Contact = () => {
  const [review, setReview] = useState({
    name: "",
    rating: 0,
    text: "",
  });

  const handleReviewChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
     const res =  await axios.post("http://localhost:5000/api/postreview", review);
      toast.success(res.data.message,{position:"top-center", autoClose:1500})
      setReview({ name: "", rating: 0, text: "" });
    } 
    catch (err) {
        if(err.response && err.response.data && err.response.data.error){
            toast.error(err.response.data.error,{position:"top-center",autoClose:1500})
        }
    }
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
      <Navbar />

      <div className="contact-main">
        <div className="contact-left">

          <h1>Contact Us</h1>
          <p>Email: support@myfurlenco.com</p>
          <p>Phone: +91 93217 88548</p>
          <p>Location: Mumbai, India</p>

          <h2>Send Us a Message</h2>
          <form className="contact-form">

            <label>Your Name</label>
            <input type="text" placeholder="Enter your name" required />

            <label>Your Email</label>
            <input type="email" placeholder="Enter your email" required />

            <label>Your Message</label>
            <textarea rows="4" placeholder="Write your message..." required></textarea>

            <button type="submit">Send Message</button>
          </form>

          <div className="social-links">
            <h3>Follow Us</h3>
            <p>Instagram | Facebook | Twitter | YouTube</p>
          </div>
        </div>

        <div className="contact-right">

          <div className="review-form-container">
            <h2>Leave a Review</h2>

            <form onSubmit={handleReviewSubmit} className="review-form">

              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={review.name}
                onChange={handleReviewChange}
                required
              />

              <label>Rating (1–5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={review.rating}
                onChange={handleReviewChange}
                required
              />

              <label>Your Review</label>
              <textarea
                name="text"
                rows="4"
                value={review.text}
                onChange={handleReviewChange}
                required
              ></textarea>

              <button type="submit">Submit Review</button>
            </form>
          </div>

          <div className="map-section">
            <h3>Find Us Here</h3>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609998776!2d72.74109941030558!3d19.082197839778955!2m3!1f0!2f0!3f0!3m2!
              1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63dfbdbe71d%3A0x94beef0dcb9a2b07!2sMumbai%2C%20Maharashtra!
              5e0!3m2!1sen!2sin!4v1697033849101!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
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

export default Contact;
