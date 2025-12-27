import { useState } from "react";
import Navbar from "./navbar";
import "../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CustomerReviews from "./customerreviews";
import {motion} from 'framer-motion'

const Home = () => {
    const navigate = useNavigate();
    const categories = [
        { name: "Sofas", image: '/images/category_sofas.jpg' },
        { name: "Beds", image: '/images/category_beds.jpg'},
        { name: "Dining", image: '/images/category_dinings.jpg' },
        { name: "Chairs", image: '/images/category_chairs.webp' },
        { name: "Wadrobes", image: '/images/category_wardrobes.webp' },
    ];
    return (
         <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
        <Navbar />
            <div className="hero-section">
    <div className="hero-overlay"></div>

    <div className="hero-content">
        <h1 className="hero-title">
            Upgrade Your Home with <span>Premium Furniture</span>
        </h1>
        <p className="hero-subtitle">
            Discover comfort, elegance, and craftsmanship — delivered straight to your doorstep.
        </p>
        <div className="hero-buttons">
            <button className="shop-btn" onClick={() => navigate("/category/sofas")}>
                Shop Now
            </button>
        </div>
    </div>
</div>


            <div className="categories">
                <h1>Our Categories</h1>
                <div className="category-list">
                    {categories.map((category, index) => (
                        <div key={index} className="category-item" onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}>
                            <img src={category.image} alt={category.name} />
                            <h2>{category.name}</h2>

                        </div>
                    ))}
                </div>
            </div>

            <CustomerReviews />

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

    )
}


export default Home;