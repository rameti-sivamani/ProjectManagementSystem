const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Access the token from cookies

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        req.user = decoded;  // Attach decoded user information to the request
        next();  // Continue to the next middleware or route handler
    });
};  

module.exports=verifyToken;