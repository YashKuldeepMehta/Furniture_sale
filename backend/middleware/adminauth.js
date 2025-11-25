const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded.isAdmin) {
            return res.status(403).json({ error: "Admin access denied" });
        }

        req.admin = decoded; 
        next();

    } catch (err) {
        console.error("Authentication error:", err);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = adminAuth;
