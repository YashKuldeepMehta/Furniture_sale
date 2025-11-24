import React from "react";
import Navbar from "./navbar";
import "../styles/about.css";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

const About = () => {
    return (
         <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
            <Navbar />
            <div className="about-hero">
                <div className="about-hero-text">
                    <h1>About MyFurlenco</h1>
                    <p>Crafting comfort, style, and affordability for every home.</p>
                </div>
            </div>

          <section className="about-section">
    <div className="about-content">
        <div className="about-left">
            <img 
                src='/images/about_furniture.png'
                alt="Furniture" 
                className="about-img" 
            />
        </div>

        <div className="about-right">
            <h2>Who We Are</h2>
            <p>
                At <strong>MyFurlenco</strong>, we believe your home should be a reflection 
                of your dreams and personality. Our journey began with a simple idea—
                making premium furniture accessible, affordable, and stylish for every family.
            </p>
            <p>
                With high-quality materials and elegant designs, our goal is to help you 
                create a home that brings warmth, comfort, and joy every single day.
            </p>
        </div>
    </div>
</section>


            <section className="mv-section">
                <div className="mv-box">
                    <h3>Our Mission</h3>
                    <p>
                        To deliver stylish, durable, and affordable furniture that enhances the beauty 
                        and comfort of every home across India.
                    </p>
                </div>

                <div className="mv-box">
                    <h3>Our Vision</h3>
                    <p>
                        To become India’s most trusted and loved online furniture brand, redefining 
                        home luxury for millions of families.
                    </p>
                </div>
            </section>

            <section className="why-choose">
                <h2>Why Choose Us?</h2>

                <div className="features-grid">
                    <div className="feature-card">
                        <img src="/images/quality_icon.jpg" alt="" />
                        <h3>Premium Quality</h3>
                        <p>We deliver furniture built from the finest materials to ensure durability.</p>
                    </div>

                    <div className="feature-card">
                        <img src="/images/affordable_icon.png" alt="" />
                        <h3>Affordable Pricing</h3>
                        <p>Luxury doesn’t need to be expensive. We keep it pocket-friendly.</p>
                    </div>

                    <div className="feature-card">
                        <img src="/images/fast_delivery.avif" alt="" />
                        <h3>Fast Delivery</h3>
                        <p>Quick and smooth delivery right to your doorstep.</p>
                    </div>

                    <div className="feature-card">
                        <img src="/images/support_icon.png" alt="" />
                        <h3>24/7 Support</h3>
                        <p>We're always here to help you with anything you need.</p>
                    </div>
                </div>
            </section>

            <section className="values-section">
                <h2>Our Values</h2>

                <div className="values-grid">
                    <div className="value-card">
                        <h3>Trust</h3>
                        <p>We build long-lasting relationships with customers through honesty and transparency.</p>
                    </div>

                    <div className="value-card">
                        <h3>Innovation</h3>
                        <p>We constantly evolve and design modern, practical furniture that enhances living spaces.</p>
                    </div>

                    <div className="value-card">
                        <h3>Customer First</h3>
                        <p>Your satisfaction is our priority, and we work tirelessly to exceed expectations.</p>
                    </div>
                </div>
            </section>

            <section className="team-section">
                <h2>Meet Our Team</h2>

                <div className="team-grid">
                    <div className="team-card">
                        <img src="/images/teammem1ceo.webp" alt="Team Member" />
                        <h4>Jospeh Mathews</h4>
                        <p>Founder & CEO</p>
                    </div>

                    <div className="team-card">
                        <img src="/images/teammem2designhead.avif" alt="Team Member" />
                        <h4>Priya Mehta</h4>
                        <p>Design Head</p>
                    </div>

                    <div className="team-card">
                        <img src="/images/teammem3ops.jpg" alt="Team Member" />
                        <h4>Aditya Verma</h4>
                        <p>Operations Manager</p>
                    </div>
                </div>
            </section>


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

export default About;
