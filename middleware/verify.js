const jwt = require("jsonwebtoken");
const middleware={};
middleware.verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Access the token from cookies

  if (!token) {
    return res.send(`<script>
        alert("Please login before accessing the dashboard");
        window.location.href = '/login';
    </script>`);
  }
 
  const SECRET_KEY = process.env.SECRET_KEY;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded; // Attach decoded user information to the request
  
    next(); // Continue to the next middleware or route handler

  });
};


middleware.TokenAvailable = (req, res, next) => {
  const token = req.cookies.token; // Access the token from cookies
  if (!token) {
    return next();
  }

  const SECRET_KEY = process.env.SECRET_KEY;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
   res.redirect('/dashboard')
  });
};


module.exports = middleware;
