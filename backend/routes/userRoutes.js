require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Product = require('../models/products');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cart = require('../models/cart')
const Order = require("../models/orders")
const Review = require("../models/review")
const Admin = require("../models/admin")
const auth = require('../middleware/auth')
const adminAuth = require("../middleware/adminauth")
const SendOrderConfirmationMail = require("../utils/sendMail")


router.get("/", (req, res) => {
    res.send("User route is working");
});

router.post("/signup", async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await newUser.save();
        res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/categorywiseproducts', async (req, res) => {
    const { category } = req.body || {};
    if (!category) {
        return res.status(400).json({ error: "Category is required" });
    }
    try {
        const products = await Product.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } });
        if (products.length === 0) {
            return res.status(404).json({ error: "No products found in this category" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/addtocart', auth, async (req, res) => {
    const { productId, quantity, name, price, image } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] })
        }
        const existingitems = cart.items.find((item) => item.productId.toString() === productId)
        if (existingitems) {
            existingitems.quantity += quantity
        } else {
            cart.items.push({ productId, quantity, name, price, image })
        }
        await cart.save();
        res.status(200).json({ message: "Product added to cart" })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
})

router.post('/fetchcart', auth, async (req, res) => {
    const userid = req.user.id
    try {
        const items = await Cart.findOne({ userId: userid })
        res.status(200).json(items)
    }
    catch (error) {
        res.status(500).json({ error: "Server error" })
    }
})

router.put('/updatecartquantity', auth, async (req, res) => {
    const { productId, quantity } = req.body;
    if (quantity <= 0) {
        return res.status(400).json({ error: "Quantity must be at least 1" });
    }
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const item = cart.items.find(i => i.productId.toString() === productId);
        if (!item) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        item.quantity = quantity;
        await cart.save();
        res.status(200).json({ message: "Cart Updated" });

    } catch (error) {
        res.status(500).json({ error: "Server Error" })
    }
})

router.delete('/removeitem/:productId', auth, async (req, res) => {
    const userId = req.user.id
    const { productId } = req.params

    try {
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            res.status(404).json({ error: "No cart found" })
        }

        const itemExists = cart.items.some((i) => i.productId.toString() === productId)
        if (!itemExists) {
            res.status(404).json({ error: "Item not found in the cart" })
        }

        cart.items = cart.items.filter((i) => i.productId.toString() !== productId)
        await cart.save()
        res.status(200).json({ message: "Item removed from cart" })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
})

router.post("/placeholder", auth, async (req, res) => {
    try {
        const { name, email, phone, address, paymentMethod, paymentDetails, cartItems, totalamount } = req.body
        const neworder = new Order({ userId: req.user.id, name, email, phone, address, paymentMethod, paymentDetails, cartItems, totalamount, orderStatus: "pending" })

        await neworder.save()
        await Cart.deleteOne({ userId: req.user.id })
        res.status(200).json({ message: "Order placed successfully" })
        await SendOrderConfirmationMail(email, neworder)

    } catch (error) {
        res.status(500).json({ error: "Failed to place order" })
    }
})

router.post("/postreview", async (req, res) => {
    try {
        const { name, rating, text } = req.body
        if (!name || !rating || !text)
            return res.status(500).json({ error: "Fields cannot be empty" })

        const reviewdoc = new Review({ name, rating, text })
        await reviewdoc.save()
        res.status(200).json({ message: "Review recorded successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/fetchreviews", async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/fetchorders", auth, async (req, res) => {
    const userid = req.user.id
    try {
        const orders = await Order.find({ userId: userid }).sort({ createdAt: -1 })
        res.status(200).json(orders)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

router.get("/orderdetails/:id", auth, async (req, res) => {
    const userid = req.user.id
    const { id } = req.params
    try {
        const order = await Order.findOne({ userId: userid, _id: id })
        if (!order) return res.status(500).json({ error: error.message })
        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

router.post("/admin/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const admin = await Admin.findOne({ email: email, password: password })
        if (!admin)
            return res.status(500).json({ error: "Invalid credentials" })

        const admintoken = jwt.sign({ id: admin._id, isAdmin:true }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", admintoken });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

router.get("/admin/stats", adminAuth, async(req,res) =>{
    try{
        const totalusers = await User.countDocuments()
        const totalorders = await Order.countDocuments()

        const pending = await Order.countDocuments({orderStatus:"pending"})
        const confirmed = await Order.countDocuments({orderStatus:"confirmed"})
        const shipped = await Order.countDocuments({orderStatus:"shipped"})
        const delivered = await Order.countDocuments({orderStatus:"delivered"})

        return res.status(200).json({totalusers,totalorders,pending,confirmed,shipped,delivered})
    }catch(error){
        return res.status(500).json({error:error.message})
    }

})

router.get("/admin/orders",adminAuth, async(req,res)=>{
    try{
        const orders = await Order.find().sort({createdAt:-1})
        return res.status(200).json(orders)
    }catch(error){
        return res.status(500).json({error:error.message})
    }
})

router.put("/admin/order/:id", adminAuth, async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  if (!status)
    return res.status(400).json({ error: "Status is required" });

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    return res.json({ message: "Order status updated successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;